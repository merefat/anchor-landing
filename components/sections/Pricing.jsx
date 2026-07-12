'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { registerGsapPlugins, gsap, ScrollTrigger } from '@/lib/gsap-plugins';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PER_MEMBER_PRICE = 10;
const BASE_PRO_PRICE = 10;

export default function Pricing() {
  const [familySize, setFamilySize] = useState(1);
  const [displayTotal, setDisplayTotal] = useState(0);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const targetTotal = BASE_PRO_PRICE + (familySize > 1 ? (familySize - 1) * PER_MEMBER_PRICE : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayTotal(targetTotal);
      return;
    }
    registerGsapPlugins();

    let obj = { val: displayTotal };
    const tween = gsap.to(obj, {
      val: targetTotal,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => setDisplayTotal(Math.round(obj.val)),
    });

    return () => tween.kill();
  }, [targetTotal, reducedMotion]);

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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="neon-text-teal">Initialize</span>
            <span className="neon-text-amber"> Your System</span>
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: 'var(--anchor-text-muted)' }}>
            Start solo. Scale with your neural network. No hidden protocols.
          </p>
        </motion.div>

        {/* Family size stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <span className="text-sm" style={{ color: 'var(--anchor-text-muted)' }}>Network Size</span>
          <div className="glass-neon flex items-center gap-3 rounded-full px-2 py-2 neon-border-teal">
            <button
              onClick={() => setFamilySize(Math.max(1, familySize - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--cyber-mid)', color: 'var(--anchor-text)' }}
              aria-label="Decrease"
            >
              −
            </button>
            <span className="text-lg font-semibold w-8 text-center" style={{ color: 'var(--anchor-text)' }}>{familySize}</span>
            <button
              onClick={() => setFamilySize(Math.min(6, familySize + 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--cyber-mid)', color: 'var(--anchor-text)' }}
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <span className="text-sm" style={{ color: 'var(--anchor-text-muted)' }}>
            {familySize === 1 ? 'Single Node' : `${familySize} Nodes`}
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free card */}
          <PricingCard
            name="Starter"
            price="$0"
            period="forever"
            description="Basic protocols for single-node operation."
            features={[
              { label: 'Daily timeline & planning', included: true },
              { label: 'Budget tracking (3 categories)', included: true },
              { label: '3 active habits', included: true },
              { label: '1 person', included: true },
              { label: 'AI Assistant', included: false },
              { label: 'Network sharing', included: false },
              { label: 'Unlimited categories', included: false },
            ]}
            cta="Initialize"
            ctaVariant="ghost"
            color="#1ebbd4"
          />

          {/* Premium card */}
          <PricingCard
            name="Neural Pro"
            price={`$${displayTotal}`}
            period="/month"
            description="Full neural network access with unlimited capabilities."
            recommended
            features={[
              { label: 'Unlimited timeline & planning', included: true },
              { label: 'Unlimited budget categories', included: true },
              { label: 'Unlimited habits', included: true },
              { label: `${familySize} ${familySize === 1 ? 'node' : 'nodes'}`, included: true },
              { label: 'Full AI Assistant', included: true },
              { label: 'Network sharing & sync', included: true },
              { label: 'Priority support', included: true },
            ]}
            cta="Activate Trial"
            ctaVariant="gradient"
            priceNote={
              familySize > 1
                ? `$${PER_MEMBER_PRICE}/mo per additional node`
                : 'Base protocol for 1 node'
            }
            color="#f89c11"
          />
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-xs"
          style={{ color: 'var(--anchor-text-muted)' }}
        >
          Credits in USD. Terminate anytime. No credit required for starter tier.
        </motion.p>
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

        <div className="mb-6">
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
