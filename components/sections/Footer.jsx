'use client';

import AnchorLogo from '@/components/ui/AnchorLogo';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Assistant', href: '#feature-ai' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-anchor-border py-16" style={{ background: 'var(--anchor-surface)' }}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--anchor-teal), transparent)' }} />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column: Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <AnchorLogo size={32} />
              <span className="text-xl font-semibold text-anchor-text">Anchor</span>
            </div>
            <p className="text-sm text-anchor-text-muted max-w-md">
              Everything that grounds your day, in one place. Plan, budget, and build
              habits — organized by AI.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-anchor-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-anchor-text-muted">
                  <div>19 Drysdale Approach</div>
                  <div>Baldivis WA 6171, Australia</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-anchor-teal flex-shrink-0" />
                <a href="mailto:contact@clickbit.com.au" className="text-sm text-anchor-text-muted hover:text-anchor-text transition-colors">
                  contact@clickbit.com.au
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-anchor-teal flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+61272299577" className="text-sm text-anchor-text-muted hover:text-anchor-text transition-colors">
                    +61 2 7229 9577
                  </a>
                  <a href="tel:+61422512130" className="text-sm text-anchor-text-muted hover:text-anchor-text transition-colors">
                    +61 422 512 130
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Links & Social */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Navigation Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-anchor-text mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-anchor-text-muted hover:text-anchor-text transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-anchor-text mb-4">Connect</h4>
              <div className="flex gap-3">
                {[
                  { name: 'facebook', href: 'https://www.facebook.com/clickbitau/' },
                  { name: 'instagram', href: 'https://www.instagram.com/clickbitau/' },
                  { name: 'linkedin', href: 'https://www.linkedin.com/company/clickbitau/' },
                  { name: 'tiktok', href: 'https://www.tiktok.com/@clickbitau' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-anchor-text-muted hover:text-anchor-teal transition-all hover:scale-110"
                    style={{ background: 'var(--anchor-glass-bg)', border: '1px solid var(--anchor-glass-border)' }}
                    aria-label={social.name}
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-anchor-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-anchor-text-muted">
            © {new Date().getFullYear()} Anchor. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-anchor-teal animate-pulse" />
            <span className="text-xs text-anchor-text-muted">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const icons = {
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    tiktok: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V8.16a6.16 6.16 0 00-1-.05A6.22 6.22 0 005 14.34 6.22 6.22 0 0011.18 20a6.35 6.35 0 006.21-6.42V9.91a7.92 7.92 0 004.6 1.47V7.88a4.87 4.87 0 01-2.4-.49V6.69z" />
      </svg>
    ),
  };
  return icons[name] || null;
}
