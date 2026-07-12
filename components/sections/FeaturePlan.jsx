'use client';

import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { useTilt, useParallax } from '@/hooks/useParallax';

const blocks = [
  { time: '06:30', label: 'Wake up', color: 'teal' },
  { time: '07:00', label: 'Morning run', color: 'teal', active: true },
  { time: '09:00', label: 'Team standup', color: 'gray' },
  { time: '10:00', label: 'Focus block', color: 'gray' },
  { time: '12:30', label: 'Lunch break', color: 'gray' },
  { time: '14:00', label: 'Project review', color: 'gray' },
  { time: '18:00', label: 'Family dinner', color: 'teal' },
  { time: '22:00', label: 'Sleep', color: 'teal' },
];

const colorMap = {
  teal: { bg: 'bg-anchor-teal/15', border: 'border-anchor-teal/40', text: 'text-anchor-teal', dot: 'bg-anchor-teal' },
  gray: { bg: 'bg-anchor-surface-light', border: 'border-anchor-border', text: 'text-anchor-text-muted', dot: 'bg-anchor-text-muted' },
};

export default function FeaturePlan() {
  const tiltRef = useTilt(0.8);
  const parallaxRef = useParallax(0.4);
  return (
    <section id="feature-plan" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <Badge color="teal" className="mb-4">Plan</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
              Design a day that{' '}
              <span className="text-anchor-teal">actually holds together.</span>
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Block wake-up, meetings, workouts, and sleep on a single timeline.
              See overcommitment before it happens — Anchor flags when you&apos;ve
              stacked too many heavy tasks back-to-back.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Drag-to-block time allocation',
                'Conflict detection before you overbook',
                'Energy-level awareness — heavy tasks when you\'re fresh',
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

          {/* Right: Phone frame with Timeline */}
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center transition-transform duration-300"
          >
            <div className="relative w-[300px]">
              {/* Phone frame with glass backing */}
              <Glass intensity="medium" glow glowColor="teal" className="absolute inset-0 rounded-[2.5rem] -z-10" />
              <div ref={tiltRef} className="relative rounded-[2.5rem] border-[3px] border-anchor-border bg-anchor-base p-3" data-theme="dark">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-anchor-base rounded-b-2xl z-10" />

                {/* Screen */}
                <div className="rounded-[2rem] bg-anchor-surface overflow-hidden">
                  <div className="p-5 pt-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Tuesday</div>
                        <div className="text-lg font-semibold text-white">Timeline</div>
                      </div>
                      <div className="w-8 h-8 rounded-full gradient-bg" />
                    </div>

                    {/* Timeline blocks with stagger */}
                    <div className="space-y-2">
                      {blocks.map((block, i) => {
                        const c = colorMap[block.color];
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                              duration: 0.5,
                              delay: i * 0.07,
                              ease: [0.19, 1, 0.22, 1],
                            }}
                            className={`flex items-center gap-3 rounded-lg border ${c.border} ${c.bg} px-3 py-2.5 ${
                              block.active ? 'ring-2 ring-anchor-teal/30 animate-pulse-glow' : ''
                            }`}
                          >
                            <div className={`text-xs font-mono ${c.text} w-10 shrink-0`}>{block.time}</div>
                            <div className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
                            <div className="text-xs font-medium text-white flex-1">{block.label}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <Glass intensity="low" className="absolute -top-4 -right-4 rounded-xl px-3 py-2 text-xs text-anchor-teal">
                No conflicts detected
              </Glass>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
