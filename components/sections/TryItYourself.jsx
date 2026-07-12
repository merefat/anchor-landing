'use client';

import { motion } from 'motion/react';
import PhoneShell from '@/components/phone/PhoneShell';
import InteractiveFlowPlayer from '@/components/phone/InteractiveFlowPlayer';
import Button from '@/components/ui/Button';
import { Calendar, Target, Anchor, Building2, Hand } from 'lucide-react';

export default function TryItYourself() {
  const features = [
    { icon: Calendar, title: 'Create a Plan', desc: 'Name your plan, pick time slots, and let AI fill the gaps' },
    { icon: Target, title: 'Build a Habit', desc: 'Set a streak, choose frequency, and track your progress' },
    { icon: Anchor, title: 'Set an Anchor', desc: 'Lock non-negotiable time blocks that AI works around' },
    { icon: Building2, title: 'Connect Your Bank', desc: 'Secure bank-grade link for real-time budget sync' },
  ];

  return (
    <section id="try-it-yourself" className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(248, 156, 17, 0.08) 0%, rgba(30, 187, 212, 0.06) 50%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl glass-neon flex items-center justify-center neon-border-amber">
                <Hand className="w-5 h-5 text-anchor-amber" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-anchor-amber uppercase">Interactive Demo</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-anchor-text tracking-tight mb-6">
              Try it <span className="gradient-text">yourself.</span>
            </h2>

            <p className="text-lg text-anchor-text-muted mb-8">
              Don't just watch — tap through real flows right here. Create a plan, set an anchor, build a habit. Experience how Anchor fits your life.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-anchor-teal/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-anchor-teal" />
                    </div>
                    <div>
                      <div className="font-semibold text-anchor-text">{feature.title}</div>
                      <div className="text-sm text-anchor-text-muted">{feature.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button variant="primary" size="lg" className="neon-border-teal glow-teal" href="#contact">
              Get Started Free
            </Button>
          </motion.div>

          {/* Right: Interactive phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <PhoneShell size="normal" tiltIntensity={0.5} label="Interactive">
              <InteractiveFlowPlayer />
            </PhoneShell>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
