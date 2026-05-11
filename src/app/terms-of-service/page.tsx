import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-card border border-white/5 p-8 md:p-12 rounded-3xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-foreground/50 mb-10 font-medium">Effective Date: May 10, 2026</p>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p>
            Welcome to PhantomLink. These Terms of Service ("Terms") govern your access to and use of the PhantomLink website (phantomlink.cc), applications, and VPN network (collectively, the "Service"), provided by PhantomLink ("we," "our," or "us").
          </p>
          <p className="font-semibold text-white">
            By creating an account, downloading our app, or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Description of Service</h2>
            <p>
              PhantomLink provides a Virtual Private Network (VPN) service designed to enhance your digital privacy and security. We provide the infrastructure (servers, protocols, and client apps) to route your internet traffic through secure tunnels. However, we do not control the content you access or the data you transmit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Acceptable Use Policy</h2>
            <p className="mb-4">
              You agree to use PhantomLink only for lawful purposes. You are solely responsible for all activity associated with your account. You strictly agree NOT to use the Service to:
            </p>
            <ul className="space-y-4 mb-4">
              <li><strong className="text-white">Distribute Spam:</strong> Send unsolicited bulk emails or messages.</li>
              <li><strong className="text-white">Engage in Cyberattacks:</strong> Launch Denial of Service (DDoS) attacks, hack, scan, or exploit third-party networks or servers.</li>
              <li><strong className="text-white">Distribute Malware:</strong> Transmit viruses, trojans, worms, or any other malicious software.</li>
              <li><strong className="text-white">Share Illegal Content:</strong> Download, upload, or distribute child exploitation material, or any content that violates international laws.</li>
              <li><strong className="text-white">Commit Fraud:</strong> Engage in credit card fraud, identity theft, or financial scams.</li>
              <li><strong className="text-white">Abuse the Network:</strong> Consume an unreasonable amount of bandwidth that severely impacts the experience of other Premium users, or attempt to bypass the 5-device simultaneous connection limit.</li>
            </ul>
            <p>
              Violation of this Acceptable Use Policy will result in immediate account termination without a refund and, if necessary, cooperation with law enforcement regarding the illegal activity itself (though we cannot provide activity logs, as we do not keep them).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Subscriptions and Payments</h2>
            <ul className="space-y-4">
              <li><strong className="text-white">Premium Access:</strong> PhantomLink operates on a paid subscription model. By subscribing, you agree to pay the fees associated with your chosen plan (1 Month, 1 Year, etc.).</li>
              <li><strong className="text-white">Payment Processors:</strong> Payments are handled securely by trusted third-party providers (e.g., Paddle) or authorized Cryptocurrency gateways. We do not process or store your raw credit card information.</li>
              <li><strong className="text-white">Auto-Renewal:</strong> If you pay via a recurring method (like a credit card), your subscription will automatically renew at the end of the billing cycle unless canceled in your account settings prior to the renewal date.</li>
              <li><strong className="text-white">Refund Policy:</strong> All cryptocurrency transactions are final. For fiat payments, we offer a 7-day money-back guarantee if the Service fails to function as advertised and our technical support cannot resolve the issue.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Account Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your PhantomLink account credentials and your unique subscription tokens. You may connect up to five (5) personal devices simultaneously under a single Premium account. You may not sell, rent, or share your account details with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for 99.9% uptime and utilize advanced protocols like VLESS/Reality to bypass restrictions, we do not guarantee that the Service will be uninterrupted, completely secure, or error-free at all times. We are not responsible for internet drops, ISP blocking, or third-party website restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, PhantomLink OOO and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or digital assets, resulting from your use of or inability to use the Service. In no event shall our total liability exceed the amount you paid us for the Service during the past six (6) months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Changes to the Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the updated Terms on this page and updating the "Effective Date." Continued use of the Service after changes are published constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
            <p className="mb-2">If you have any questions or concerns regarding these Terms of Service, please contact us at:</p>
            <ul className="space-y-1">
              <li><strong className="text-white">Email:</strong> legal@phantomlink.cc</li>
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
