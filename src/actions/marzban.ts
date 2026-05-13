'use server';

import { createClient } from '@/utils/supabase/server';

const MARZBAN_API_URL = process.env.MARZBAN_API_URL || 'https://us.phantomlink.cc:8000';
const MARZBAN_USERNAME = process.env.MARZBAN_USERNAME || 'admin';
const MARZBAN_PASSWORD = process.env.MARZBAN_PASSWORD || 'OypimOY2WJaTAdIfl9';

// 1. Get Admin Token
async function getAdminToken() {
  const body = new URLSearchParams({
    grant_type: 'password',
    username: MARZBAN_USERNAME,
    password: MARZBAN_PASSWORD
  });

  const res = await fetch(`${MARZBAN_API_URL}/api/admin/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: body.toString(),
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to get Marzban token');
  }

  const data = await res.json();
  return data.access_token;
}

// 2. Get User
async function getMarzbanUser(token: string, username: string) {
  const res = await fetch(`${MARZBAN_API_URL}/api/user/${username}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    cache: 'no-store'
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch user from Marzban');
  }

  return await res.json();
}

// 3. Create User
async function createMarzbanUser(token: string, username: string) {
  const res = await fetch(`${MARZBAN_API_URL}/api/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      proxies: {
        "vless": {}
      },
      inbounds: {
        "vless": ["VLESS TCP REALITY"]
      }
    }),
    cache: 'no-store'
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Marzban creation error:', err);
    throw new Error('Failed to create Marzban user');
  }

  return await res.json();
}

// Main Action: Provision VPN User for current Supabase User
export async function provisionVpnUser() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'Not authenticated' };
  }

  try {
    // Generate username: prefix 'free_' for free users + supabase UID
    // Read from user profile/db to determine premium status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .single();
    
    const isPremium = profile?.is_premium || false;
    
    // Marzban usernames shouldn't have hyphens if strict, so we sanitize UID
    const safeUid = user.id.replace(/-/g, '');
    const marzbanUsername = isPremium ? `prem_${safeUid}` : `free_${safeUid}`;

    const token = await getAdminToken();
    
    let marzbanUser = await getMarzbanUser(token, marzbanUsername);
    
    if (!marzbanUser) {
      marzbanUser = await createMarzbanUser(token, marzbanUsername);
    }

    return { 
      success: true, 
      user: marzbanUser,
      subscriptionUrl: marzbanUser.subscription_url 
        ? `${MARZBAN_API_URL}${marzbanUser.subscription_url}` 
        : null 
    };

  } catch (error: unknown) {
    console.error('Provisioning error:', error);
    if (error instanceof Error) return { error: error.message };
    return { error: 'Failed to provision VPN user' };
  }
}
