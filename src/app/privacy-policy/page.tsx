import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-card border border-white/5 p-8 md:p-12 rounded-3xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-foreground/50 mb-10 font-medium">Effective Date: May 10, 2026</p>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p>
            Welcome to PhantomLink ("we," "our," or "us"). We are committed to protecting your privacy and providing a secure, unrestricted internet experience. This Privacy Policy explains how we handle your data when you use our website (phantomlink.cc) and our VPN services.
          </p>
          <p className="text-xl font-semibold text-white">
            Our core mission is simple: We do not monitor, record, or store your online activity.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Strict No-Logs Policy</h2>
            <p className="mb-4">
              PhantomLink operates under a strict zero-logs policy. This means we do not track or store any information about what you do while connected to our VPN.
            </p>
            <p className="mb-2 font-medium">We DO NOT collect or store:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Browsing history or visited websites.</li>
              <li>Incoming or outgoing traffic data.</li>
              <li>Original IP addresses.</li>
              <li>DNS queries.</li>
              <li>Connection timestamps or session durations.</li>
            </ul>
            <p>
              Because we do not store this data, we cannot share it with anyone, including governments, third-party advertisers, or internet service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Do Collect</h2>
            <p className="mb-4">To provide our services, manage subscriptions, and ensure technical stability, we collect only the absolute minimum required data:</p>
            <ul className="space-y-4">
              <li><strong className="text-white">Account Information:</strong> When you register, we collect an email address and an encrypted password. This is strictly used for account management and access recovery.</li>
              <li><strong className="text-white">Payment Information:</strong> We do not store your credit card details. All fiat payments are processed securely by our certified third-party payment providers (e.g., Paddle). If you choose to pay via Cryptocurrency, we only retain the transaction ID required to activate your Premium subscription.</li>
              <li><strong className="text-white">Technical Diagnostics (Optional):</strong> We may collect anonymized crash reports to improve our apps, but only if you explicitly opt-in within the application settings. This data never contains personally identifiable information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Protect Your Data</h2>
            <p className="mb-4">We utilize industry-leading security protocols to safeguard your information:</p>
            <ul className="space-y-4">
              <li><strong className="text-white">Advanced Encryption:</strong> All data transmitted between your device and our servers is secured using modern encryption standards (VLESS/Reality protocols, AES-256).</li>
              <li><strong className="text-white">RAM-Only Servers:</strong> Our VPN infrastructure runs entirely on volatile memory (RAM). Every time a server is restarted, all temporary routing data is permanently wiped.</li>
              <li><strong className="text-white">Kill Switch:</strong> Our client applications include an active Kill Switch feature to prevent accidental data leaks if your connection to our servers drops.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We may use third-party services to process payments and provide customer support. These providers are bound by strict data protection agreements and are only permitted to process data necessary to perform their specific tasks. We will never sell or rent your email address or account details to advertising agencies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Data Rights</h2>
            <p className="mb-4">Depending on your region (such as under the GDPR in Europe or the CCPA in California), you have specific rights regarding your personal data:</p>
            <ul className="space-y-4">
              <li><strong className="text-white">Right to Access:</strong> You can request a summary of the account data we hold about you.</li>
              <li><strong className="text-white">Right to Deletion:</strong> You have the right to permanently delete your PhantomLink account. You can do this directly from the settings menu in our applications or by contacting our support team. Upon deletion, all associated account data is permanently erased from our active databases.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy occasionally to reflect technical or legal changes. We will notify active users of any significant updates via email or a notice within the app. Your continued use of PhantomLink after updates indicates your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p className="mb-2">If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact our support team at:</p>
            <ul className="space-y-1">
              <li><strong className="text-white">Email:</strong> support@phantomlink.cc</li>
              <li><strong className="text-white">Website:</strong> phantomlink.cc</li>
            </ul>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <a href="/" className="inline-block px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 font-bold transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
