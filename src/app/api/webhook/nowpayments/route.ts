import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const MARZBAN_API_URL = process.env.MARZBAN_API_URL || 'https://us.phantomlink.cc:8000';
const MARZBAN_USERNAME = process.env.MARZBAN_USERNAME || 'admin';
const MARZBAN_PASSWORD = process.env.MARZBAN_PASSWORD || 'OypimOY2WJaTAdIfl9';

// Helper to get Marzban token
async function getMarzbanToken() {
  const body = new URLSearchParams({
    grant_type: 'password',
    username: MARZBAN_USERNAME,
    password: MARZBAN_PASSWORD
  });
  const res = await fetch(`${MARZBAN_API_URL}/api/admin/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    body: body.toString()
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get('x-nowpayments-sig');

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify signature
    // NOWPayments requires sorting keys alphabetically before stringifying, but the raw body string is sometimes used.
    // Let's parse it and sort keys as per NOWPayments docs
    const data = JSON.parse(rawBody);
    const sortedString = JSON.stringify(data, Object.keys(data).sort());
    
    const hmac = crypto.createHmac('sha512', NOWPAYMENTS_IPN_SECRET);
    hmac.update(sortedString);
    const expectedSig = hmac.digest('hex');

    if (sig !== expectedSig) {
      console.warn('Invalid NOWPayments signature. Expected:', expectedSig, 'Got:', sig);
      // For testing, we might not block strictly if we are sure, but it's best to block
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process payment if finished
    if (data.payment_status === 'finished' || data.payment_status === 'confirmed') {
      const orderId = data.order_id; // format: order_UUID_timestamp
      if (!orderId) return NextResponse.json({ success: true });
      
      const userId = orderId.split('_')[1];
      if (!userId) return NextResponse.json({ success: true });

      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      // 1. Update user profile to premium in Supabase
      await supabaseAdmin.from('profiles').update({ 
        is_premium: true 
      }).eq('id', userId);

      // 2. Upgrade in Marzban (remove limits, change name)
      try {
        const token = await getMarzbanToken();
        const safeUid = userId.replace(/-/g, '');
        const oldUsername = `free_${safeUid}`;
        const newUsername = `prem_${safeUid}`;

        // Update user in Marzban (PUT /api/user/{username})
        // We set data_limit to 0 (unlimited), expire to 0 (unlimited)
        const res = await fetch(`${MARZBAN_API_URL}/api/user/${oldUsername}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            username: newUsername,
            data_limit: 0,
            expire: 0
          })
        });

        if (!res.ok) {
          console.error('Marzban upgrade error:', await res.text());
        }
      } catch (marzbanErr) {
        console.error('Failed to communicate with Marzban:', marzbanErr);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
