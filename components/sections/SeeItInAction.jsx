'use client';

import { motion } from 'motion/react';
import PhoneShell from '@/components/phone/PhoneShell';
import DemoFlowPlayer from '@/components/phone/DemoFlowPlayer';
import TutorialStep from '@/components/ui/TutorialStep';
import Button from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Download, User, Link, Target, Sparkles, MousePointerClick } from 'lucide-react';

export default function SeeItInAction() {
  const reducedMotion = useReducedMotion();

  const tutorialSteps = [
    {
      num: '01',
      title: 'Download & Install',
      desc: 'Get Anchor from the App Store or Google Play. It\'s free to start.',
      icon: Download,
    },
    {
      num: '02',
      title: 'Create Account',
      desc: 'Sign up with your email, set up your profile, and choose your preferences.',
      icon: User,
    },
    {
      num: '03',
      title: 'Connect Integrations',
      desc: 'Link your calendar, bank, and habit goals for a complete picture.',
      icon: Link,
    },
    {
      num: '04',
      title: 'Set Your Anchors',
      desc: 'Mark non-negotiables like sleep, work hours, and rent day.',
      icon: Target,
    },
    {
      num: '05',
      title: 'Let AI Organise',
      desc: 'Watch Anchor build your optimal day and adjust when life happens.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="see-it-in-action" className="relative overflow-hidden py-24 md:py-32">
      {/* Heading */}
      <div className="relative z-10 text-center mb-12 section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-anchor-text tracking-tight"
        >
          See it in <span className="gradient-text">action.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-sm text-anchor-text-muted max-w-lg mx-auto"
        >
          Watch the demo to see how Anchor works, then try it yourself.
        </motion.p>
      </div>

      {/* Phone demo + tutorial steps */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Auto-playing demo phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <PhoneShell size="normal" tiltIntensity={0.5} label="Auto Demo">
              <DemoFlowPlayer reducedMotion={reducedMotion} />
            </PhoneShell>
          </motion.div>

          {/* Right: Tutorial steps */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {tutorialSteps.map((step) => (
              <TutorialStep
                key={step.num}
                num={step.num}
                title={step.title}
                desc={step.desc}
                icon={step.icon}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="neon-border-teal glow-teal"
                href="#try-it-yourself"
              >
                <span className="flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4" />
                  Try It Yourself
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
