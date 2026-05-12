'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpgradeButton({ plan = '1_month', children, className }: { plan?: string, children: React.ReactNode, className?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/cryptomus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });

      if (res.status === 401) {
        // Not logged in
        router.push('/login');
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Cryptomus
      } else {
        alert('Failed to start checkout: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className={className || "w-full py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl font-bold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(234,179,8,0.3)] disabled:opacity-50"}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}
