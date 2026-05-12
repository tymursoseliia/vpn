import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { provisionVpnUser } from '@/actions/marzban';
import DashboardClient from './DashboardClient';
import UpgradeButton from './UpgradeButton';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Check if they are premium in Supabase (stub for now, later fetch from profile table)
  const isPremium = false; 

  // Provision / Fetch VPN user from Marzban
  const provisionResult = await provisionVpnUser();
  const subscriptionUrl = provisionResult.subscriptionUrl || '';

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10 opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto pt-16 px-6">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <img src="/2026-05-10 18.09.54.jpg" alt="PhantomLink" className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <h1 className="text-2xl font-bold">My Dashboard</h1>
              <p className="text-foreground/50 text-sm">{user.email}</p>
            </div>
          </div>
          
          <form action="/auth/signout" method="post">
            <button className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Main VPN Link Card */}
          <div className="md:col-span-2 bg-card border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-xl font-bold mb-2">Your VPN Connection</h2>
            <p className="text-foreground/60 mb-8 text-sm">Use this secure link to connect all your devices to PhantomLink.</p>
            
            {provisionResult.error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                Error setting up VPN: {provisionResult.error}
              </div>
            ) : (
              <DashboardClient subscriptionUrl={subscriptionUrl} />
            )}
          </div>

          {/* Subscription Status Card */}
          <div className="md:col-span-1 bg-gradient-to-b from-card to-background border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">Current Plan</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6">
                {isPremium ? (
                  <><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Premium</>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-green-400"></span> Free Tier</>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-foreground/70">
                  <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Basic Speed (Romania)
                </li>
                {!isPremium && (
                  <li className="flex items-start gap-2 text-sm text-foreground/40 line-through">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    All Global Servers
                  </li>
                )}
                {!isPremium && (
                  <li className="flex items-start gap-2 text-sm text-foreground/40 line-through">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Ad-Free Experience
                  </li>
                )}
              </ul>
            </div>
            
            {!isPremium && (
              <UpgradeButton plan="1_month">
                Upgrade to Premium
              </UpgradeButton>
            )}
          </div>

        </div>

        {/* Instructions Section */}
        <div className="mt-12 bg-card border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">How to connect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Copy your link</h3>
              <p className="text-sm text-foreground/60">Click the copy button above to get your secure subscription link.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Download App</h3>
              <p className="text-sm text-foreground/60">Download the PhantomLink app for iOS, Android, macOS, or Windows.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Add Profile</h3>
              <p className="text-sm text-foreground/60">Open the app, click &quot;Add Profile&quot; and paste your link. You are protected!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
