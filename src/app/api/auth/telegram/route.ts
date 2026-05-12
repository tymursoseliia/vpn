import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createClient as createServerClient } from '@/utils/supabase/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8911196176:AAGVv5txPyDFSG5hkv6COHu8xpjrfNVt_64';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Verify Telegram Hash
    const { hash, ...userData } = data;
    
    // Create data check string
    const secretKey = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
    
    const dataCheckString = Object.keys(userData)
      .sort()
      .map(key => `${key}=${userData[key]}`)
      .join('\n');
      
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    
    if (hmac !== hash) {
      return NextResponse.json({ error: 'Invalid hash' }, { status: 401 });
    }

    // 2. Auth looks good, now link to Supabase
    // We use the Service Role Key to bypass RLS and create/fetch the user
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    const telegramEmail = `${userData.id}@telegram.phantomlink.cc`;
    // We generate a deterministic strong password based on their Telegram ID and our Bot Token
    const generatedPassword = crypto.createHash('sha256').update(`${userData.id}-${TELEGRAM_BOT_TOKEN}`).digest('hex').substring(0, 24) + "Aa1!";

    // Check if user exists
    let { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email: telegramEmail,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        telegram_id: userData.id,
        first_name: userData.first_name,
        username: userData.username
      }
    });

    // If user already exists (error 422), that's fine. We just log them in.
    if (adminError && !adminError.message.includes('already registered')) {
      console.error('Supabase admin create error:', adminError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Now, log the user in normally using the server client to set the cookies
    const supabase = await createServerClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: telegramEmail,
      password: generatedPassword
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    // Optionally update the profiles table to ensure telegram_id is set
    // (Our SQL trigger creates the profile, but we can update it here)
    if (adminData?.user) {
      await supabaseAdmin.from('profiles').update({ 
        telegram_id: userData.id.toString() 
      }).eq('id', adminData.user.id);
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Telegram API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
