'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function TelegramLoginWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Only load script once
    if (containerRef.current && containerRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'PhantomLinkVPN613bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '12');
      script.setAttribute('data-request-access', 'write');
      
      // We set a callback function in the global window object
      (window as any).onTelegramAuth = async (user: any) => {
        try {
          const res = await fetch('/api/auth/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
          });
          
          if (res.ok) {
            router.push('/dashboard');
            router.refresh();
          } else {
            const data = await res.json();
            alert('Telegram auth failed: ' + data.error);
          }
        } catch (err) {
          console.error(err);
        }
      };

      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, [router]);

  return (
    <div className="flex justify-center mt-4">
      <div ref={containerRef}></div>
    </div>
  );
}
