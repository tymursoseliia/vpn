import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

const CRYPTOMUS_MERCHANT_ID = process.env.CRYPTOMUS_MERCHANT_ID || '';
const CRYPTOMUS_PAYMENT_KEY = process.env.CRYPTOMUS_PAYMENT_KEY || '';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // You can pass { plan: '1_month' | '1_year' } in the body
    const { plan } = await req.json().catch(() => ({ plan: '1_month' }));
    
    const amount = plan === '1_year' ? '49.99' : '7.99';
    const orderId = `order_${user.id}_${Date.now()}`;

    const payload = {
      amount: amount,
      currency: 'USD',
      order_id: orderId,
      url_return: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/dashboard`,
      url_success: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/dashboard?payment=success`,
      url_callback: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/api/webhook/cryptomus`,
      is_payment_multiple: false,
      lifetime: '3600', // 1 hour to pay
    };

    // Cryptomus requires base64 payload + payment key md5 hash for the sign header
    const payloadStr = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadStr).toString('base64');
    const sign = crypto.createHash('md5').update(base64Payload + CRYPTOMUS_PAYMENT_KEY).digest('hex');

    const res = await fetch('https://api.cryptomus.com/v1/payment', {
      method: 'POST',
      headers: {
        'merchant': CRYPTOMUS_MERCHANT_ID,
        'sign': sign,
        'Content-Type': 'application/json'
      },
      body: payloadStr
    });

    const data = await res.json();

    if (data.state === 0 && data.result?.url) {
      // Save pending order to DB if needed, here we just redirect
      return NextResponse.json({ url: data.result.url });
    } else {
      console.error('Cryptomus API Error:', data);
      return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
    }

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
