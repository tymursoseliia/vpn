import Image from "next/image";
import UpgradeButton from "./dashboard/UpgradeButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-background/80 border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/2026-05-10 18.09.54.jpg" alt="PhantomLink Logo" className="w-12 h-12 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] object-cover" />
            <span className="text-xl font-bold tracking-tight">PhantomLink</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-foreground/80">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#download" className="hover:text-primary transition-colors">Download</a>
          </nav>
          <div className="flex gap-4">
            <a href="/login" className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors flex items-center">Login</a>
            <a href="/login" className="text-sm font-bold bg-primary text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center">Get Premium</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wide">
            VLESS / XTLS-Reality Powered
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Total Privacy.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Unlimited Speed.</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-12">
            Bypass restrictions instantly with the most advanced VPN protocol. Zero logs. Global access. Total freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <UpgradeButton plan="1_month" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              Get Premium Now
            </UpgradeButton>
            <a href="https://github.com/tymursoseliia/PhantomLink/releases" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-card border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition-all text-center inline-block">
              Download App
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why PhantomLink?</h2>
            <p className="text-foreground/70">Engineered to be invisible to censors.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Strict No-Logs Policy", desc: "We don't track, collect, or share your private data. Ever." },
              { title: "100+ Global Servers", desc: "Ultra-fast connection to optimized nodes around the world." },
              { title: "Advanced Kill Switch", desc: "Your real IP is never exposed, even if the connection drops." },
              { title: "VLESS/Reality", desc: "Masks VPN traffic as normal web browsing to bypass DPI." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-card/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-foreground/70">Pay with Crypto or Credit Card. Instant delivery.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 1 Month */}
            <div className="p-8 rounded-3xl bg-card border border-white/10 flex flex-col">
              <h3 className="text-2xl font-bold text-foreground/80 mb-2">1 Month</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">$7.99</span>
                <span className="text-foreground/50">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited Bandwidth', 'Up to 5 Devices', 'All Premium Servers', '24/7 Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <UpgradeButton plan="1_month" className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors">
                Choose Plan
              </UpgradeButton>
            </div>

            {/* 1 Year */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-b from-card to-card border border-primary shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-black font-bold px-4 py-1 rounded-full text-sm whitespace-nowrap">
                Best Value / Save 48%
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">1 Year</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">$49.99</span>
                <span className="text-foreground/50">/yr</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited Bandwidth', 'Up to 5 Devices', 'All Premium Servers', 'Priority Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <UpgradeButton plan="1_year" className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                Choose Plan
              </UpgradeButton>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download PhantomLink</h2>
            <p className="text-foreground/70">Get the app for your favorite device and connect in seconds.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/tymursoseliia/PhantomLink/releases/download/v1.0.0/PhantomLink-Windows.1.zip" className="flex flex-col items-center justify-center p-8 w-64 rounded-3xl bg-card border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Windows</h3>
              <p className="text-sm text-foreground/50">Windows 10 & 11</p>
            </a>
            <a href="https://github.com/tymursoseliia/PhantomLink/releases/download/v1.0.0/PhantomLink.4.1.2.dmg" className="flex flex-col items-center justify-center p-8 w-64 rounded-3xl bg-card border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13.12 4.22c.7-.84 1.17-2.01 1.04-3.18-1.01.04-2.26.67-2.98 1.53-.64.75-1.2 1.95-1.04 3.09 1.12.09 2.28-.59 2.98-1.44"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">macOS</h3>
              <p className="text-sm text-foreground/50">Apple Silicon & Intel</p>
            </a>
            <a href="https://github.com/tymursoseliia/PhantomLink/releases/download/v1.0.0/PhantomLink-Android.apk" className="flex flex-col items-center justify-center p-8 w-64 rounded-3xl bg-card border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1517-.5677.416.416 0 00-.5677.1517l-2.0318 3.519C15.698 8.314 13.9167 7.9 12 7.9s-3.698.414-5.1276 1.0652L4.8406 5.4462a.416.416 0 00-.5677-.1517.416.416 0 00-.1517.5677l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Android</h3>
              <p className="text-sm text-foreground/50">APK Installer</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/2026-05-10 18.09.54.jpg" alt="PhantomLink Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-bold">PhantomLink</span>
          </div>
          <div className="flex gap-6 text-sm text-foreground/50">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="text-sm text-foreground/50">© 2026 PhantomLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
