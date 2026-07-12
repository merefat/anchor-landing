'use client';

import { motion } from 'motion/react';
import Glass from '@/components/ui/Glass';
import { Users, Briefcase, Target } from 'lucide-react';

const personas = [
  {
    title: 'The parent juggling three schedules',
    desc: 'School pickups, soccer practice, date night, and a shared grocery budget — all on one timeline that everyone can see.',
    icon: Users,
    color: 'teal',
  },
  {
    title: 'The freelancer whose income moves',
    desc: 'Variable paydays, project deadlines, and a budget that flexes with the month. Anchor adjusts so you don\'t have to think about it.',
    icon: Briefcase,
    color: 'amber',
  },
  {
    title: 'The habit builder who keeps falling off',
    desc: 'Visible streaks, gentle reconnection after a miss, and AI suggestions for stacking new habits onto existing anchors.',
    icon: Target,
    color: 'teal',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
            Built for the way{' '}
            <span className="gradient-text">real people</span> live.
          </h2>
          <p className="mt-4 text-sm text-anchor-text-muted">
            Real testimonials coming once we launch. Here&apos;s who we&apos;re building for.
          </p>
        </motion.div>

        {/* Persona cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6"
            >
              <Glass intensity="low" className="h-full rounded-2xl p-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  persona.color === 'teal'
                    ? 'bg-anchor-teal/10 border border-anchor-teal/20'
                    : 'bg-anchor-amber/10 border border-anchor-amber/20'
                }`}
                style={{ color: persona.color === 'teal' ? 'var(--anchor-teal)' : 'var(--anchor-orange)' }}
              >
                <persona.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-base font-semibold text-anchor-text mb-2">
                {persona.title}
              </h3>
              <p className="text-sm text-anchor-text-muted leading-relaxed">
                {persona.desc}
              </p>
              </Glass>
            </motion.div>
          ))}
        </div>

        {/* Placeholder note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Glass intensity="low" className="inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-anchor-teal animate-pulse" />
            <span className="text-xs text-anchor-text-muted">
              [ Real user quotes will replace these once Anchor launches ]
            </span>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}
