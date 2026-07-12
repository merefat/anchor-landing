'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PhoneShell from '@/components/phone/PhoneShell';
import DemoFlowPlayer from '@/components/phone/DemoFlowPlayer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';

const DynamicLifeOrbit = dynamic(
  () => import('@/components/three/LifeOrbit'),
  { ssr: false, loading: () => null }
);

const DynamicAnchorChain3D = dynamic(
  () => import('@/components/three/AnchorChain3D'),
  { ssr: false, loading: () => null }
);

export default function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { mousePosition, containerRef } = useParallaxTilt();

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden overflow-x-hidden cyber-grid scanlines px-4 sm:px-6"
      style={{
        background: 'var(--anchor-base)'
      }}
    >
      {/* Life Orbit background */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-0">
          <ErrorBoundary fallback={null}>
            <DynamicLifeOrbit />
          </ErrorBoundary>
        </div>
      )}

      {/* 3D Anchor Chain background */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-0">
          <ErrorBoundary fallback={null}>
            <DynamicAnchorChain3D
              linkCount={7}
              linkSize={0.8}
              rotationSpeed={0.2}
              className="absolute inset-0 w-full h-full opacity-40"
            />
          </ErrorBoundary>
        </div>
      )}

      {/* Gradient orbs */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--anchor-teal-glow)' }}
      />
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--anchor-orange-glow)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto section-padding pt-24 sm:pt-32 pb-16 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center" style={{ gridTemplateColumns: isMobile ? '1fr' : '0.55fr 0.45fr' }}>
          {/* Left: Copy */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 glass-neon neon-border-teal">
                <span className="neon-text-teal">NEW: AI-POWERED ORCHESTRATION</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ color: 'var(--anchor-text)' }}
            >
              <span className="neon-text-teal">Your Life,</span>
              <br />
              <span className="neon-text-teal">Orchestrated</span>
              <br />
              <span className="neon-text-orange">by AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 max-w-xl"
              style={{ color: 'var(--anchor-text-muted)' }}
            >
              Stop juggling apps. Start living intentionally. One intelligent system that syncs your schedule, budget, habits, and family — all powered by AI that actually learns your patterns.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" className="neon-border-teal glow-teal" href="#contact">
                Contact Us
              </Button>
              <Button variant="secondary" size="lg" className="neon-border-orange" href="#try-it-yourself">
                Try It Yourself
              </Button>
            </motion.div>
          </div>

          {/* Right: Anchor App Phone with Auto Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative h-[500px] sm:h-[500px] md:h-[500px] lg:h-[600px] flex items-center justify-center perspective-3d"
          >
            {/* Auto-looping demo phone */}
            <PhoneShell size={isMobile ? 'small' : 'normal'} tiltIntensity={0.8} label="Live Demo">
              <DemoFlowPlayer reducedMotion={reducedMotion} />
            </PhoneShell>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2" style={{ color: 'var(--anchor-text-muted)' }}>
          <span className="text-xs neon-text-teal">INITIATE SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 neon-border-teal"
          >
            <div className="w-1.5 h-3 rounded-full animate-pulse" style={{ background: 'var(--anchor-teal-neon)' }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
