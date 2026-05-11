import Image from "next/image";

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
            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              Get Premium Now
            </button>
            <button className="px-8 py-4 bg-card border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              Download App
            </button>
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
              <button className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors">
                Choose Plan
              </button>
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
              <button className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                Choose Plan
              </button>
            </div>
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
