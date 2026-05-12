import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import VpnKeySection from './VpnKeySection'
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
          <VpnKeySection initialKey={user.user_metadata?.vpn_link || null} />
        </div>

      </div>
    </div>
  )
}
