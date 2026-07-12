'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import Glass from '@/components/ui/Glass';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useTilt, useParallax } from '@/hooks/useParallax';

const DynamicAnchorRibbon = dynamic(
  () => import('@/components/three/AnchorRibbon'),
  { ssr: false, loading: () => null }
);

export default function FinalCTA() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const tiltRef = useTilt(1.2);
  const parallaxRef1 = useParallax(0.5);
  const parallaxRef2 = useParallax(0.7);

  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background glow with parallax */}
      <div ref={parallaxRef1} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-anchor-teal/8 blur-[150px] pointer-events-none transition-transform duration-300" />
      <div ref={parallaxRef2} className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-anchor-amber/5 blur-[120px] pointer-events-none transition-transform duration-300" />

      {/* 3D Anchor — settled, not floating (bookend with hero) */}
      {!reducedMotion && !isMobile && (
        <div className="absolute inset-0 z-0 opacity-60">
          <ErrorBoundary fallback={null}>
            <DynamicAnchorRibbon className="w-full h-full" />
          </ErrorBoundary>
        </div>
      )}

      <div ref={tiltRef} className="relative z-10 max-w-3xl mx-auto section-padding text-center transition-transform duration-300">
        {/* Settled anchor (static for mobile) */}
        {(reducedMotion || isMobile) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
              <path d="M32 8 C28 16, 24 24, 28 32 C32 40, 36 48, 32 56" stroke="#1ebbd4" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M32 8 C36 16, 40 24, 36 32 C32 40, 28 48, 32 56" stroke="#f89c11" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="32" cy="10" r="4" stroke="url(#cta-grad)" strokeWidth="2.5" fill="none" />
              <line x1="20" y1="18" x2="44" y2="18" stroke="url(#cta-grad)" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="cta-grad" x1="0" y1="0" x2="64" y2="64">
                  <stop stopColor="#1ebbd4" />
                  <stop offset="1" stopColor="#f89c11" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-4xl md:text-6xl font-bold text-anchor-text tracking-tight"
        >
          Drop anchor.{' '}
          <span className="gradient-text">Everything else can wait.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-anchor-text-muted max-w-xl mx-auto"
        >
          Start free today. No credit card, no trial timer ticking down.
          Just a better way to run your day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" variant="gradient" href="#pricing">
            Start free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </motion.div>

        {/* Store badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          <Glass intensity="low" className="rounded-xl px-4 py-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-anchor-surface-light transition-colors">
            <StoreBadge store="apple" />
          </Glass>
          <Glass intensity="low" className="rounded-xl px-4 py-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-anchor-surface-light transition-colors">
            <StoreBadge store="google" />
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}

function StoreBadge({ store }) {
  return (
    <>
      {store === 'apple' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3.6 2.3l9.8 9.8-9.8 9.8c-.3-.3-.5-.7-.5-1.2V3.5c0-.5.2-.9.5-1.2z" fill="#1ebbd4" />
          <path d="M17.1 8.4l2.8-1.6c.6-.3 1.3-.3 1.9.1L13.4 15.3l-2.3-2.3 6-4.6z" fill="#f89c11" />
          <path d="M13.4 11.1l2.3 2.3-2.3 2.3-2.3-2.3 2.3-2.3z" fill="#fff" fillOpacity="0.3" />
        </svg>
      )}
      <div className="text-left">
        <div className="text-[10px] text-anchor-text-muted leading-none">
          {store === 'apple' ? 'Download on the' : 'Get it on'}
        </div>
        <div className="text-sm font-semibold text-anchor-text leading-tight">
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </>
  );
}
