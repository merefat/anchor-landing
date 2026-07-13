import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Anchor',
  description: 'Privacy Policy for Anchor',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--anchor-base)' }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-anchor-text-muted hover:text-anchor-text transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-anchor-text mb-4">Privacy Policy for Anchor</h1>
        <p className="text-sm text-anchor-text-muted mb-8">Effective Date: July 6, 2026</p>
        <p className="text-sm text-anchor-text-muted mb-6">Entity Name: ClickBit (referred to as "we", "our", or "us") | Jurisdiction: Commonwealth of Australia</p>

        <div className="prose prose-invert max-w-none" style={{ color: 'var(--anchor-text-muted)' }}>
          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">1. Introduction and Scope</h2>
          <p className="mb-4">ClickBit operates the Anchor mobile application (available on iOS, iPadOS, and Android). We are bound by the Privacy Act 1988 (Cth) (the Privacy Act) and the Australian Privacy Principles (APPs).</p>
          <p className="mb-4">This Privacy Policy sets out how we collect, use, store, and disclose your personal information, specifically addressing our use of artificial intelligence and cross-border data routing.</p>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">2. Collection of Personal Information (APP 3 & APP 5)</h2>
          <p className="mb-4">We practice strict data minimization. We explicitly do not request, collect, or store your mobile phone number. We collect the following classes of personal information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Identity & Contact Data:</strong> Email address, first and last name (retrieved solely via secure Single Sign-On using Apple or Google Authentication).</li>
            <li><strong>Profile Data (Optional):</strong> Profile photographs and display names, provided strictly at your discretion.</li>
            <li><strong>Location Data:</strong> GPS and IP-based location data processed via the Google Maps API. This is collected to ensure accurate, location-aware scheduling, timezone synchronization, and timely routine prompts.</li>
            <li><strong>Behavioral & App Usage Data:</strong> Interactions with the app, habit inputs, and task completion logs.</li>
            <li><strong>Financial Data:</strong> Premium ("Freemium") subscription status and billing history. Payment processing is handled exclusively by Stripe; ClickBit does not collect, process, or store raw credit card numbers.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">3. Use and Disclosure of Personal Information (APP 6)</h2>
          <p className="mb-4">We use your personal information for the primary purpose for which it was collected, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Establishing and managing your individual or Family Account (up to 4 members).</li>
            <li>Delivering personalized routine and financial habit tracking.</li>
            <li>Processing subscription payments securely.</li>
          </ul>
          <p className="mb-4">We will not use or disclose your personal information for a secondary purpose unless you have consented, or the secondary use is permitted under the Privacy Act.</p>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">4. Automated Decision-Making & Artificial Intelligence (APP 1.7 & APP 1.8)</h2>
          <p className="mb-4">Anchor integrates an artificial intelligence agent (powered by the MiniMax model) to support and optimize daily routines.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Data Processing:</strong> The AI processes pseudonymized behavioral data, logged habits, and app interaction frequencies to suggest workflow and routine optimizations.</li>
            <li><strong>Limitation of Effect (Advisory Only):</strong> Anchor's automated systems do not make decisions that produce legal effects or similarly significantly affect users. All AI-generated financial habit optimizations and routine adjustments are strictly advisory. Users maintain absolute discretion and manual override capability over all suggestions.</li>
            <li><strong>Opt-Out:</strong> You may disable AI-driven suggestions within the Anchor settings menu at any time.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">5. Third-Party Integrations and API Boundaries</h2>
          <p className="mb-4">Anchor allows optional synchronization with third-party productivity tools, specifically Clockify and Habitica.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>User-Initiated Transmission:</strong> Anchor operates on a strict opt-in API boundary. No personal data or scheduling information is transmitted to these third parties unless you actively authorize the connection.</li>
            <li><strong>Limitation of Liability:</strong> Once data is transmitted to Clockify or Habitica at your request, the data is governed entirely by the respective privacy policies of those platforms. ClickBit disclaims liability for the processing of your data by third-party services once it leaves the Anchor environment.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">6. Children's Privacy & Family Accounts</h2>
          <p className="mb-4">Anchor offers a Family Account tier supporting up to four (4) linked members. In alignment with the Children's Online Privacy Code 2026:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The primary Family Account holder must be 18 years of age or older.</li>
            <li>Where a Family Account involves the processing of personal information of individuals under the age of 16, the primary account holder acts as the consenting parent or legal guardian.</li>
            <li>ClickBit strictly prohibits the commercialization, third-party marketing, or targeted advertising use of any data associated with minor accounts.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">7. Cross-Border Disclosure of Personal Information (APP 8)</h2>
          <p className="mb-4">To provide a resilient, globally accessible service, Anchor engages specialized third-party sub-processors.</p>
          <p className="mb-4">Under APP 8.1, ClickBit takes reasonable steps to ensure overseas recipients do not breach the APPs. We achieve this by ensuring our primary sub-processors (Supabase and Stripe) are bound by strict Data Processing Agreements (DPAs) and international frameworks (such as SOC2 and GDPR compliance) that mandate equivalent privacy safeguards.</p>
          <p className="mb-4">Your data may be securely processed by:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Supabase:</strong> Core database and secure cloud storage.</li>
            <li><strong>Stripe:</strong> Secure payment processing.</li>
            <li><strong>Google (Maps API & Auth) / Apple (Auth):</strong> Geolocation logic and secure login authentication.</li>
            <li><strong>MiniMax:</strong> Processing of AI inference queries.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">8. Security and Data Destruction (APP 11)</h2>
          <p className="mb-4">We take active, reasonable steps to protect your personal information from misuse, interference, loss, unauthorized access, modification, or disclosure via industry-standard encryption protocols.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Erasure:</strong> You possess the right to permanently delete your Anchor account via the Settings &gt; Account &gt; Delete Account interface.</li>
            <li><strong>Data Purge:</strong> Upon initiation, your Identity, Profile, and Behavioral data will be permanently erased or cryptographically anonymized from our active Supabase servers within 30 days, satisfying both Australian data destruction obligations and app store regulatory requirements.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">9. Access, Correction, and Complaints (APP 12 & APP 13)</h2>
          <p className="mb-4">You have a statutory right to request access to the personal information we hold about you and to request corrections. We will respond to all requests within 30 days without charge.</p>
          <p className="mb-4">If you believe ClickBit has breached the Australian Privacy Principles, please contact us at:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>ClickBit Privacy Officer</strong></li>
            <li><strong>Email:</strong> contact@clickbit.com.au</li>
            <li><strong>Address:</strong> 19 Drysdale Approach Baldivis WA 6171 Australia</li>
          </ul>
          <p className="mb-4">If you are not satisfied with our resolution, you maintain the right to lodge a formal complaint with the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.</p>
        </div>
      </div>
    </div>
  );
}
