'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { registerGsapPlugins, gsap, ScrollTrigger } from '@/lib/gsap-plugins';
import Glass from '@/components/ui/Glass';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useParallax } from '@/hooks/useParallax';
import { Calendar, Wallet, CheckCircle, FileText, Timer } from 'lucide-react';

const ghostApps = [
  { name: 'Calendar', icon: Calendar, x: -180, y: -80, rot: -15 },
  { name: 'Budget', icon: Wallet, x: 160, y: -60, rot: 12 },
  { name: 'Habits', icon: CheckCircle, x: -120, y: 100, rot: 8 },
  { name: 'Notes', icon: FileText, x: 140, y: 90, rot: -10 },
  { name: 'Timer', icon: Timer, x: 0, y: -130, rot: 5 },
];

export default function Problem() {
  const sectionRef = useRef(null);
  const iconsRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const parallaxRef = useParallax(0.4);

  useEffect(() => {
    if (reducedMotion) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const icons = iconsRef.current?.querySelectorAll('[data-ghost-icon]');
      if (!icons) return;

      // Initial scattered state
      gsap.set(icons, {
        x: (i) => ghostApps[i].x * 1.5,
        y: (i) => ghostApps[i].y * 1.5,
        rotation: (i) => ghostApps[i].rot * 3,
        opacity: 0.3,
        scale: 0.8,
      });

      // Scroll-scrubbed: pull together into anchor silhouette
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          icons.forEach((icon, i) => {
            gsap.set(icon, {
              x: ghostApps[i].x * (1 - p * 0.9),
              y: ghostApps[i].y * (1 - p * 0.9),
              rotation: ghostApps[i].rot * (1 - p),
              opacity: 0.3 + p * 0.5,
              scale: 0.8 + p * 0.3,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden cyber-grid scanlines" style={{ background: 'var(--anchor-base)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--anchor-teal-glow)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--anchor-purple-glow)' }} />
      <div className="max-w-5xl mx-auto section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="neon-text-teal">Your Reality</span>
            <span className="neon-text-orange"> is Fragmented</span>
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: 'var(--anchor-text-muted)' }}>
            A calendar that doesn&apos;t know your budget. A budget app that doesn&apos;t
            know your schedule. A habit tracker that knows neither.
          </p>
        </motion.div>

        {/* Visual: scattered icons converging */}
        <div ref={parallaxRef} className="relative h-[400px] flex items-center justify-center transition-transform duration-300">
          <div ref={iconsRef} className="relative w-full h-full flex items-center justify-center">
            {ghostApps.map((app, i) => (
              <Glass key={app.name} intensity="medium" className="absolute rounded-2xl p-4 w-24 h-24 flex flex-col items-center justify-center gap-1" data-ghost-icon>
                <app.icon size={24} strokeWidth={2} className="text-anchor-text" />
                <span className="text-xs text-anchor-text-muted">{app.name}</span>
              </Glass>
            ))}

            {/* Anchor silhouette that emerges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute z-10"
            >
              <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
                <path d="M32 8 C28 16, 24 24, 28 32 C32 40, 36 48, 32 56" stroke="#1ebbd4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M32 8 C36 16, 40 24, 36 32 C32 40, 28 48, 32 56" stroke="#f89c11" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                <circle cx="32" cy="10" r="4" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
                <line x1="20" y1="18" x2="44" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-2xl md:text-3xl font-semibold">
            <span className="gradient-text">One anchor.</span>{' '}
            <span className="text-anchor-text">Every part of your day.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
