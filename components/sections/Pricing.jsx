'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { registerGsapPlugins, gsap, ScrollTrigger } from '@/lib/gsap-plugins';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Unlock } from 'lucide-react';

const PERSONAL_PRICE = 6.99;
const FAMILY_PRICE = 12.99;

export default function Pricing() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="pricing" className="relative py-32 overflow-hidden cyber-grid scanlines" style={{ background: 'var(--anchor-base)' }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'var(--anchor-teal-glow)' }} />

      <div className="max-w-6xl mx-auto section-padding relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Unlock className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--anchor-teal)' }} />
            Unlock Your Full Potential
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: 'var(--anchor-text-muted)' }}>
            Choose the plan that's right for you.
          </p>
        </motion.div>


        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free card */}
          <PricingCard
            name="Free"
            price="$0"
            period="Forever"
            description=""
            features={[
              { label: '1 Active Habit', included: true },
              { label: 'Basic Routines', included: true },
              { label: 'Limited Insights', included: true },
            ]}
            cta="Current Plan"
            ctaVariant="ghost"
            color="#1ebbd4"
          />

          {/* Personal card */}
          <PricingCard
            name="Personal"
            price={`$${PERSONAL_PRICE}`}
            period="/month"
            description=""
            recommended
            features={[
              { label: 'Unlimited Habits', included: true },
              { label: 'Advanced Insights', included: true },
              { label: 'Budget Tools', included: true },
              { label: 'Priority Support', included: true },
            ]}
            cta="Start Free Trial"
            ctaVariant="gradient"
            color="#f89c11"
          />

          {/* Family card */}
          <PricingCard
            name="Family"
            price={`$${FAMILY_PRICE}`}
            period="/month"
            description=""
            features={[
              { label: 'Everything in Personal', included: true },
              { label: 'Family Collaboration', included: true },
              { label: 'Shared Schedules', included: true },
              { label: 'Family Insights', included: true },
            ]}
            cta="Start Free Trial"
            ctaVariant="gradient"
            color="#f89c11"
          />
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
        >
          {[
            'Restore Purchases',
            '7-Day Free Trial',
            'Cancel Anytime',
            'Secure Payment',
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--anchor-text-muted)' }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--anchor-teal)20' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#1ebbd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const PricingCard = memo(function PricingCard({ name, price, period, description, features, cta, ctaVariant, recommended, priceNote, color }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`relative ${recommended ? 'neon-border-orange glow-amber' : 'neon-border-teal'}`}
    >
      {/* Breathing glow for recommended card */}
      {recommended && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(248, 156, 17, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      <div className={`glass-neon-${recommended ? 'orange' : 'teal'} rounded-2xl p-8 h-full transition-transform duration-200 ease-out`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
        >
        {recommended && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="glass-neon-orange px-4 py-1 rounded-full text-xs font-semibold neon-text-orange">
              RECOMMENDED
            </div>
          </div>
        )}

        <div className="mb-6 pt-4">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--anchor-text)' }}>{name}</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--anchor-text-muted)' }}>{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold" style={{ color: color }}>{price}</span>
            <span className="text-sm" style={{ color: 'var(--anchor-text-muted)' }}>{period}</span>
          </div>
          {priceNote && (
            <p className="text-xs mt-2" style={{ color: 'var(--anchor-text-muted)' }}>{priceNote}</p>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              {feature.included ? (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--cyber-mid)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="var(--anchor-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <span style={{ color: feature.included ? 'var(--anchor-text)' : 'var(--anchor-text-muted)' }}>
                {feature.label}
              </span>
            </li>
          ))}
        </ul>

        <Button variant={ctaVariant} size="md" href="#" className="w-full" style={{ borderColor: color }}>
          {cta}
        </Button>
        </div>
      </div>
    </motion.div>
  );
});
