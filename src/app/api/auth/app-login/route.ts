import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Initialize Supabase admin client to bypass RLS and authenticate properly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 1. Authenticate user using email and password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const userId = authData.user.id;

    // 2. Fetch the user's sub_link from profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('sub_link, is_premium')
      .eq('id', userId)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    let finalSubLink = profileData.sub_link;

    if (!finalSubLink) {
      // Auto-generate the VPN Key on the fly if it doesn't exist
      const safeUid = userId.replace(/-/g, '').substring(0, 16);
      const isPremium = profileData.is_premium || false;
      const marzbanUsername = isPremium ? `prem_${safeUid}` : `free_${safeUid}`;

      const MARZBAN_API_URL = process.env.MARZBAN_API_URL || 'https://us.phantomlink.cc:8000';
      const MARZBAN_USERNAME = process.env.MARZBAN_USERNAME || 'admin';
      const MARZBAN_PASSWORD = process.env.MARZBAN_PASSWORD || 'OypimOY2WJaTAdIfl9';

      // 1. Get Admin Token
      const body = new URLSearchParams({
        grant_type: 'password',
        username: MARZBAN_USERNAME,
        password: MARZBAN_PASSWORD
      });

      const tokenRes = await fetch(`${MARZBAN_API_URL}/api/admin/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: body.toString(),
      });
      
      const tokenData = await tokenRes.json();
      const token = tokenData.access_token;

      // 2. Create Marzban User
      const createRes = await fetch(`${MARZBAN_API_URL}/api/user`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: marzbanUsername,
          proxies: { "vless": {} },
          inbounds: { "vless": ["VLESS TCP REALITY"] }
        })
      });

      let marzbanUser;
      if (createRes.status === 409) {
        // User already exists in Marzban but not in Supabase, fetch it
        const getRes = await fetch(`${MARZBAN_API_URL}/api/user/${marzbanUsername}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        marzbanUser = await getRes.json();
      } else {
        marzbanUser = await createRes.json();
      }

      finalSubLink = `${MARZBAN_API_URL}${marzbanUser.subscription_url}`;

      // 3. Save it to Supabase
      await supabase
        .from('profiles')
        .update({ sub_link: finalSubLink })
        .eq('id', userId);
    }

    // 3. Return the sub_link back to the mobile app
    return NextResponse.json({ 
      success: true, 
      sub_link: finalSubLink,
      is_premium: profileData.is_premium
    }, { status: 200 });

  } catch (error) {
    console.error('App Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
