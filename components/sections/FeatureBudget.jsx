'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { registerGsapPlugins, gsap, ScrollTrigger } from '@/lib/gsap-plugins';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt, useParallax } from '@/hooks/useParallax';

const transactions = [
  { label: 'Rent', amount: 1200, color: '#f89c11' },
  { label: 'Groceries', amount: 340, color: '#1ebbd4' },
  { label: 'Transport', amount: 120, color: '#f89c11' },
  { label: 'Dining', amount: 180, color: '#1ebbd4' },
  { label: 'Other', amount: 160, color: 'var(--anchor-text-muted)' },
];

const total = transactions.reduce((s, t) => s + t.amount, 0);

function DonutChart({ progress }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--anchor-surface-light)" strokeWidth="16" />
      {transactions.map((t, i) => {
        const fraction = t.amount / total;
        const dashLength = fraction * circumference * progress;
        const dash = `${dashLength} ${circumference}`;
        const el = (
          <circle
            key={i}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={t.color}
            strokeWidth="16"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            transform="rotate(-90 90 90)"
            strokeLinecap="round"
          />
        );
        offset += fraction * circumference * progress;
        return el;
      })}
      <text x="90" y="85" textAnchor="middle" fill="var(--anchor-text)" fontSize="22" fontWeight="700">
        ${Math.round(total * progress).toLocaleString()}
      </text>
      <text x="90" y="105" textAnchor="middle" fill="var(--anchor-text-muted)" fontSize="11">
        Total spent
      </text>
    </svg>
  );
}

export default function FeatureBudget() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [countUp, setCountUp] = useState(0);
  const reducedMotion = useReducedMotion();
  const tiltRef = useTilt(0.8);
  const parallaxRef = useParallax(0.4);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      setCountUp(total);
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
          setProgress(self.progress);
          setCountUp(Math.round(total * self.progress));
        },
        onLeave: () => {
          setProgress(1);
          setCountUp(total);
        },
        onLeaveBack: () => {
          setProgress(0);
          setCountUp(0);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual (reversed layout) */}
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center order-2 lg:order-1 transition-transform duration-300"
          >
            <Glass intensity="medium" glow glowColor="amber" className="relative rounded-2xl p-8">
              <motion.div ref={tiltRef} className="flex flex-col">
              {/* Bank card icon */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-3 w-48 mb-6 mx-auto"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 rounded bg-gradient-to-br from-anchor-amber to-anchor-amber-dark" />
                  <div>
                    <div className="text-xs text-anchor-text-muted">Secure import</div>
                    <div className="text-xs font-medium text-anchor-text">•••• 4821</div>
                  </div>
                </div>
              </motion.div>

              {/* Transaction chips flowing */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {transactions.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-full px-3 py-1.5 text-xs flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="text-anchor-text">{t.label}</span>
                    <span className="text-anchor-text font-medium">${t.amount}</span>
                  </motion.div>
                ))}
              </div>

              {/* Donut chart */}
              <div className="flex justify-center">
                <DonutChart progress={progress} />
              </div>

              {/* Count-up display */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-4 grid grid-cols-3 gap-3"
              >
                {[
                  { label: 'Today', value: `$${Math.round(countUp * 0.03)}` },
                  { label: 'This week', value: `$${Math.round(countUp * 0.25)}` },
                  { label: 'This month', value: `$${countUp.toLocaleString()}` },
                ].map((stat, i) => (
                  <div key={i} className="rounded-lg p-3 text-center">
                    <div className="text-xs text-anchor-text-muted">{stat.label}</div>
                    <div className="text-sm font-semibold text-anchor-amber">{stat.value}</div>
                  </div>
                ))}
              </motion.div>
              </motion.div>
            </Glass>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2"
          >
            <Badge color="amber" className="mb-4">Budget</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
              Your bank already knows what you spent.{' '}
              <span className="text-anchor-amber">Now your plan does too.</span>
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Secure transaction import, auto-categorized, sitting right next to your
              time blocks. See that $14 lunch at 12:30 and the $62 grocery run at 6 PM —
              on the same timeline as your meetings and workouts.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Bank-grade 256-bit encryption for all imports',
                'Automatic categorization — no manual tagging',
                'Budget vs. actual tracking in real time',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-anchor-text"
                >
                  <div className="w-5 h-5 rounded-full bg-anchor-amber/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-anchor-amber" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
