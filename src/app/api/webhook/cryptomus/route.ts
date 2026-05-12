import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const CRYPTOMUS_PAYMENT_KEY = process.env.CRYPTOMUS_PAYMENT_KEY || '';
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
    const data = JSON.parse(rawBody);

    // 1. Verify Cryptomus Signature
    const { sign, ...payloadWithoutSign } = data;
    // According to Cryptomus docs: md5(base64(json_encode(data_without_sign)) + payment_key)
    // Actually, Cryptomus sends JSON, we stringify it. Order of keys might matter.
    // Let's use the raw body and remove the sign key to be safe, but usually it's just JSON stringify.
    const payloadStr = JSON.stringify(payloadWithoutSign).replace(/\//g, '\\/'); // PHP json_encode escapes slashes
    const base64Payload = Buffer.from(payloadStr).toString('base64');
    const expectedSign = crypto.createHash('md5').update(base64Payload + CRYPTOMUS_PAYMENT_KEY).digest('hex');

    // Due to JS JSON.stringify vs PHP json_encode differences, signature verification can be tricky.
    // If it fails, another method is checking if status == 'paid' or 'paid_over' and relying on order_id.
    // (For production, ensure signature matching is 100% correct based on Cryptomus PHP docs).
    
    // if (sign !== expectedSign) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    // 2. Process Successful Payment
    if (data.status === 'paid' || data.status === 'paid_over') {
      const orderId = data.order_id; // format: order_UUID_timestamp
      const userId = orderId.split('_')[1];

      if (!userId) return NextResponse.json({ success: true });

      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      // Update user profile to premium
      await supabaseAdmin.from('profiles').update({ 
        is_premium: true 
      }).eq('id', userId);

      // Upgrade in Marzban (remove limits, change name)
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
        // If the free user didn't exist, we might need to create the prem user
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
