'use client';

import { useRef, memo, useCallback } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const steps = [
  {
    num: '01',
    title: 'Connect',
    desc: 'Link your calendar, bank, and habit goals. One-time setup, bank-grade encryption.',
    color: '#1ebbd4',
  },
  {
    num: '02',
    title: 'Set Anchors',
    desc: 'Mark the non-negotiables — sleep, work hours, rent day. Everything else flexes around them.',
    color: '#f89c11',
  },
  {
    num: '03',
    title: 'AI Organise',
    desc: 'Anchor builds your optimal day, adjusts when life happens, and keeps every part in sync.',
    color: '#1ebbd4',
  },
];

export default function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--hiw-bg)', minHeight: '600px' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 20%, #1ebbd4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #f89c11 0%, transparent 50%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(var(--hiw-grid-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--hiw-grid-line) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Heading */}
      <div className="relative z-10 pb-16 text-center section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-3xl md:text-5xl font-bold tracking-tight"
          style={{ color: 'var(--hiw-heading)' }}
        >
          HOW IT WORKS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="text-lg md:text-xl mt-4"
          style={{ color: 'var(--hiw-text)' }}
        >
          Build Your Intelligent Daily Routine
        </motion.p>
      </div>

      {/* Timeline container */}
      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {/* Connection line */}
          <svg className="absolute top-1/2 left-0 right-0 -translate-y-1/2" style={{ height: '2px', overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1ebbd4" />
                <stop offset="50%" stopColor="#1ebbd4" />
                <stop offset="100%" stopColor="#f89c11" />
              </linearGradient>
            </defs>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" />
            {/* Traveling particle */}
            <motion.circle
              r="4"
              fill="#1ebbd4"
              initial={{ x: 0 }}
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 8px #1ebbd4)' }}
            />
          </svg>

          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} reducedMotion={reducedMotion} />
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory px-6 pb-8">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} reducedMotion={reducedMotion} mobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const StepCard = memo(function StepCard({ step, index, reducedMotion, mobile = false }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || !innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    innerRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(18px)`;
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
  }, []);

  const cardVariants = {
    hidden: reducedMotion
      ? { opacity: 0.9 }
      : { opacity: 0, scale: 0.92, filter: 'blur(12px)', translateY: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0)',
      translateY: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`relative ${mobile ? 'w-[320px] snap-center' : 'w-[360px]'} shrink-0`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
    <div
      ref={innerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {/* Card */}
      <motion.div
        whileHover={{
          translateY: -18,
          boxShadow: '0 40px 90px rgba(6, 214, 255, 0.3)',
        }}
        className="relative rounded-[28px] p-6"
        style={{
          background: 'var(--hiw-card-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--hiw-card-border)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated border light */}
        <motion.div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
            backgroundSize: '200% 100%',
            opacity: 0.5,
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Moving reflection */}
        <motion.div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* CSS Icon */}
        <div className="relative h-[140px] mb-4" style={{ transform: 'translateZ(20px)' }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                border: `2px solid ${step.color}`,
                boxShadow: `0 0 25px ${step.color}`,
              }}
            >
              <span className="text-4xl font-bold" style={{ color: step.color }}>
                {step.num}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Watermark number */}
        <div
          className="absolute top-4 right-4 text-[80px] font-bold pointer-events-none"
          style={{
            color: step.color,
            opacity: 0.1,
            transform: 'translateZ(-10px)',
          }}
        >
          {step.num}
        </div>

        {/* Content */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ transform: 'translateZ(10px)' }}
        >
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--hiw-heading)' }}
          >
            {step.title}
          </h3>
          <p
            className="text-sm leading-relaxed font-semibold"
            style={{ color: 'var(--hiw-text)' }}
          >
            {step.desc}
          </p>
        </motion.div>
      </motion.div>
    </div>
    </motion.div>
  );
});
