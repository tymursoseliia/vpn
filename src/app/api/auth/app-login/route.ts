import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Initialize Supabase admin client to bypass RLS and authenticate properly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
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

    // 2. Fetch the user's sub_link from supabase_profiles
    const { data: profileData, error: profileError } = await supabase
      .from('supabase_profiles')
      .select('sub_link, is_premium')
      .eq('id', userId)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    if (!profileData.sub_link) {
      return NextResponse.json({ error: 'No active subscription found. Please buy Premium on the website.' }, { status: 403 });
    }

    // 3. Return the sub_link back to the mobile app
    return NextResponse.json({ 
      success: true, 
      sub_link: profileData.sub_link,
      is_premium: profileData.is_premium
    }, { status: 200 });

  } catch (error) {
    console.error('App Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
