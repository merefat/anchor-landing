import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy - Anchor',
  description: 'Anchor Refund & Cancellation Policy',
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--anchor-base)' }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-anchor-text-muted hover:text-anchor-text transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-anchor-text mb-4">Anchor Refund & Cancellation Policy</h1>
        <p className="text-sm text-anchor-text-muted mb-8">Effective Date: July 13, 2026</p>

        <div className="prose prose-invert max-w-none" style={{ color: 'var(--anchor-text-muted)' }}>
          <p className="text-lg mb-6">
            Thank you for choosing Anchor to orchestrate your daily routine. We are committed to providing you with a seamless AI-powered scheduling and budgeting experience. Please read this policy carefully to understand your rights regarding subscriptions, cancellations, and refunds under Australian law.
          </p>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">1. Subscription Terms</h2>
          <p className="mb-4">Anchor offers a premium subscription tier, Neural Pro, billed on a recurring monthly basis.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Free Trials:</strong> We offer an initial trial period to allow you to experience full neural network access, unlimited timeline planning, and AI assistant capabilities before being charged.</li>
            <li><strong>Billing Cycle:</strong> If you do not cancel before your trial ends, your payment method will be automatically charged the standard recurring subscription fee each month.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">2. Cancellation Policy</h2>
          <p className="mb-4">We believe in flexibility. As stated in our terms, you may terminate anytime.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>How to Cancel:</strong> You can cancel your Neural Pro subscription at any time directly through your account settings in the Anchor app or by contacting our support team.</li>
            <li><strong>Effect of Cancellation:</strong> If you terminate your subscription, your cancellation will take effect at the end of your current paid billing cycle. You will retain full access to all Neural Pro features until that cycle concludes.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">3. Australian Consumer Guarantees</h2>
          <p className="mb-4">Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Consumers are entitled to a remedy, which can include a repair, replacement, or refund, if a product or service fails to meet these basic statutory rights.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Major Problems:</strong> You are entitled to cancel your service contract with us and receive a refund if there is a major problem with the service. A problem is considered major if it would have stopped someone from buying the service had they known about it, if the service is significantly different from the description, or if it doesn't do what we said it would do and cannot be easily fixed.</li>
            <li><strong>Minor Problems:</strong> For minor problems with our service, we will fix the issue or repair the product for free within a reasonable time.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">4. Refund Policy</h2>
          <p className="mb-4">It is illegal for businesses in Australia to rely on terms and conditions that completely deny a consumer's right to a refund, such as a blanket "no refunds" policy.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Change of Mind:</strong> We are not legally required to provide a refund if you simply change your mind about your subscription. Because Anchor offers a free trial to evaluate the product and operates on a monthly billing cycle, we do not provide prorated refunds or credits for partially used billing periods due to a change of mind.</li>
            <li><strong>Service Failures:</strong> If you experience severe technical issues or outages that constitute a major problem, you have the right to cancel your contract and receive a refund. This refund may be partial or full, depending on whether some or all of the services provided were functional.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-anchor-text mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-4">If you have any questions about your subscription, wish to request a refund, or need assistance with cancellation, please reach out to our team using the following details:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Email:</strong> contact@clickbit.com.au</li>
            <li><strong>Phone:</strong> +61 2 7229 9577 | +61 422 512 130</li>
            <li><strong>Mailing Address:</strong> Anchor (Clickbit) 19 Drysdale Approach Baldivis WA 6171, Australia</li>
          </ul>

          <p className="text-sm text-anchor-text-muted mt-8">© 2026 Anchor. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
