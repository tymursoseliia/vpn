'use client';

import { useState } from 'react';

export default function DashboardClient({ subscriptionUrl }: { subscriptionUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subscriptionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-primary overflow-hidden text-ellipsis whitespace-nowrap">
        {subscriptionUrl || 'Generating your link...'}
      </div>
      
      <button 
        onClick={copyToClipboard}
        disabled={!subscriptionUrl}
        className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0 flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
