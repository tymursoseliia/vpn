'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VpnKeySection({ initialKey }: { initialKey: string | null }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/vpn/generate', {
        method: 'POST'
      })
      if (res.ok) {
        // Обновляем страницу, чтобы серверный компонент подтянул новый ключ из Supabase
        router.refresh()
      } else {
        alert('Failed to generate key. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Error generating key.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (initialKey) {
      navigator.clipboard.writeText(initialKey)
      alert('Key copied to clipboard!')
    }
  }

  return (
    <div className="col-span-1 md:col-span-2 bg-card border border-white/5 p-6 md:p-8 rounded-3xl shadow-lg flex flex-col h-full">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Your VPN Access Key
      </h2>

      <div className="flex-1 flex flex-col justify-center">
        {initialKey ? (
          <>
            <div className="bg-background/50 border border-white/10 rounded-2xl p-4 mb-6 relative group">
              <p className="font-mono text-sm text-foreground/70 break-all pr-12 line-clamp-3">
                {initialKey}
              </p>
              <button 
                onClick={handleCopy}
                className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 group-hover:border-white/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleCopy}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors border border-white/10 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Key
              </button>
              <a 
                href={`hiddify://import/${initialKey}`}
                className="py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold transition-colors border border-primary/30 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Connect (Hiddify)
              </a>
            </div>
          </>
        ) : (
          <div className="text-center bg-background/30 border border-white/5 rounded-2xl p-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">No active VPN key</h3>
            <p className="text-foreground/60 mb-6 text-sm">
              Generate your unique VLESS key to access the VPN servers.
            </p>
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="py-3 px-8 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate New Key'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
