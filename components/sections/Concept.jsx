'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import AnchorSystemWidget from '@/components/ui/AnchorSystemWidget';
import '@/components/ui/anchor-system.css';

const AnchorRipple = dynamic(
  () => import('@/components/three/AnchorRipple'),
  { ssr: false, loading: () => null }
);

// Clock widget with 3D visualization - updated

export default function Concept() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden cyber-grid scanlines" style={{ background: 'var(--anchor-base)' }}>
      {/* Anchor ripple background */}
      <AnchorRipple />
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--anchor-orange-glow)' }} />
      <div className="max-w-6xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-anchor-text tracking-tight leading-tight">
              Every wake-up, meeting, workout, and dollar spent is an{' '}
              <span className="gradient-text">anchor point</span> in your day.
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Anchor doesn&apos;t just list your tasks — it maps them. Time and money
              sit on the same 24-hour ring, so you see the full shape of your day at a glance.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-anchor-teal" />
                <span className="text-sm text-anchor-text-muted">Teal anchors mark your time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-anchor-amber" />
                <span className="text-sm text-anchor-text-muted">Amber anchors mark your money</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Anchor System Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center"
          >
            <AnchorSystemWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
