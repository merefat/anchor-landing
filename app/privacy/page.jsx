import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Anchor',
  description: 'Anchor Privacy Policy',
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

        <h1 className="text-4xl font-bold text-anchor-text mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none" style={{ color: 'var(--anchor-text-muted)' }}>
          <p className="text-lg">
            Privacy Policy content will be added here. Please provide the text content from the Word document.
          </p>
        </div>
      </div>
    </div>
  );
}
