'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { registerGsapPlugins, gsap, ScrollTrigger } from '@/lib/gsap-plugins';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt, useParallax } from '@/hooks/useParallax';

const days = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: false }, // missed day - broken link
  { day: 'F', done: true },
  { day: 'S', done: true },
  { day: 'S', done: true },
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
];

export default function FeatureHabits() {
  const sectionRef = useRef(null);
  const [visibleLinks, setVisibleLinks] = useState(0);
  const reducedMotion = useReducedMotion();
  const tiltRef = useTilt(0.8);
  const parallaxRef = useParallax(0.4);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLinks(days.length);
      return;
    }
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          setVisibleLinks(Math.floor(self.progress * days.length));
        },
        onLeave: () => setVisibleLinks(days.length),
        onLeaveBack: () => setVisibleLinks(0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <Badge color="teal" className="mb-4">Habits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
              Streaks you can actually see{' '}
              <span className="text-anchor-teal">holding you steady.</span>
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Each completed day adds a link to your chain. Miss a day? The chain
              breaks — but it reconnects the moment you pick back up. No guilt, just
              a visual reminder that consistency compounds.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Visual chain metaphor — see your streak grow',
                'Flexible: miss a day, reconnect the next',
                'Habit stacking suggestions from AI',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-anchor-text"
                >
                  <div className="w-5 h-5 rounded-full bg-anchor-teal/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-anchor-teal" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Chain visualisation */}
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center transition-transform duration-300"
          >
            <Glass intensity="medium" glow glowColor="teal" className="rounded-2xl p-8 w-full max-w-md">
              <motion.div ref={tiltRef} className="flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-semibold text-anchor-text">Morning workout</div>
                  <div className="text-xs text-anchor-text-muted">Current streak</div>
                </div>
                <div className="text-2xl font-bold text-anchor-teal">
                  {visibleLinks > 3 ? `${visibleLinks - 1} days` : `${visibleLinks} days`}
                </div>
              </div>

              {/* Chain links */}
              <div className="flex flex-wrap gap-1 items-center">
                {days.map((day, i) => {
                  const isVisible = i < visibleLinks;
                  const isBroken = !day.done && isVisible;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="flex items-center"
                    >
                      <div
                        className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                          isBroken
                            ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                            : 'bg-anchor-teal/15 border border-anchor-teal/40 text-anchor-teal'
                        }`}
                      >
                        {day.day}
                        {isBroken && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-500/40" />
                        )}
                      </div>
                      {i < days.length - 1 && (
                        <div
                          className={`w-3 h-0.5 mx-0.5 transition-all ${
                            isBroken
                              ? 'bg-red-500/20'
                              : isVisible
                                ? 'bg-anchor-teal/40'
                                : 'bg-anchor-border'
                          }`}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Status */}
              <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-anchor-teal animate-pulse" />
                <span className="text-xs text-anchor-text-muted">
                  {visibleLinks >= days.length
                    ? 'Chain complete — keep going!'
                    : 'Building your chain...'}
                </span>
              </div>
              </motion.div>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
