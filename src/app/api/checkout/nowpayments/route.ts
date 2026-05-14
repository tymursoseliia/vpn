import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY || '';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json().catch(() => ({ plan: '1_month' }));
    
    // Set prices
    const amount = plan === '1_year' ? 49.99 : 7.99;
    const orderId = `order_${user.id}_${Date.now()}`;

    const payload = {
      price_amount: amount,
      price_currency: 'usd',
      order_id: orderId,
      order_description: `PhantomLink Premium VPN - ${plan === '1_year' ? '1 Year' : '1 Month'}`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/dashboard?payment=cancelled`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://phantomlink.cc'}/api/webhook/nowpayments`,
    };

    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.invoice_url) {
      return NextResponse.json({ url: data.invoice_url });
    } else {
      console.error('NOWPayments API Error:', data);
      return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
    }

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
