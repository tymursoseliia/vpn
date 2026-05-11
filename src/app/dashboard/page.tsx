import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Проверяем, авторизован ли пользователь
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Заглушка для типа подписки (позже будем брать из базы)
  const isPremium = false;

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header кабинета */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card border border-white/5 p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-2xl">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Personal Cabinet</h1>
              <p className="text-foreground/50 text-sm">{user.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/10">
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Статус подписки */}
          <div className="col-span-1 md:col-span-1 bg-card border border-white/5 p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
            {isPremium ? (
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
            ) : (
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-500/10 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
            )}
            
            <div>
              <h2 className="text-lg font-semibold text-foreground/80 mb-2">Current Plan</h2>
              {isPremium ? (
                <div>
                  <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                    Premium <span className="text-primary text-xl">✦</span>
                  </div>
                  <p className="text-primary/80 mt-2 text-sm font-medium">Active until 12.06.2026</p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-extrabold text-white">Free</div>
                  <p className="text-foreground/50 mt-2 text-sm">Speed limited. Upgrade for max speed.</p>
                </div>
              )}
            </div>

            {!isPremium && (
              <div className="mt-8">
                <Link href="/#pricing" className="block w-full text-center py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  Upgrade to Premium
                </Link>
              </div>
            )}
          </div>

          {/* Карточка с ключом */}
          <div className="col-span-1 md:col-span-2 bg-card border border-white/5 p-6 md:p-8 rounded-3xl shadow-lg flex flex-col h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Your VPN Access Key
            </h2>

            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-background/50 border border-white/10 rounded-2xl p-4 mb-6 relative group">
                <p className="font-mono text-sm text-foreground/70 break-all pr-12 line-clamp-3">
                  vless://phantom-test-key-1234567890@us1.phantomlink.cc:443?type=tcp&security=reality&pbk=xxx&fp=chrome&sni=phantomlink.cc&sid=xxx&spx=%2F#PhantomLink_Free
                </p>
                <button className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 group-hover:border-white/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors border border-white/10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Key
                </button>
                <button className="py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold transition-colors border border-primary/30 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Connect (Hiddify)
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
