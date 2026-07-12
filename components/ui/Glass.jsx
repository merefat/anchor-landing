'use client';

import { motion } from 'motion/react';
import { memo, useEffect, useRef, useState } from 'react';

const glassVariants = {
  // High intensity - signature moments (Hero, FinalCTA)
  high: {
    blur: 'blur(24px)',
    saturate: 'saturate(140%)',
    bgOpacity: 0.15,
    borderOpacity: 0.25,
    shadowOpacity: 0.15,
  },
  // Medium intensity - feature sections, diagrams
  medium: {
    blur: 'blur(16px)',
    saturate: 'saturate(120%)',
    bgOpacity: 0.1,
    borderOpacity: 0.2,
    shadowOpacity: 0.1,
  },
  // Low intensity - cards, badges
  low: {
    blur: 'blur(12px)',
    saturate: 'saturate(110%)',
    bgOpacity: 0.08,
    borderOpacity: 0.15,
    shadowOpacity: 0.08,
  },
};

function Glass({
  children,
  intensity = 'medium',
  className = '',
  glow = false,
  glowColor = 'teal',
  ...props
}) {
  const variant = glassVariants[intensity] || glassVariants.medium;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const glowColors = {
    teal: 'var(--anchor-glow-teal-1)',
    amber: 'var(--anchor-glow-amber-1)',
  };

  return (
    <motion.div
      ref={ref}
      className={`glass ${className}`}
      style={{
        backdropFilter: isVisible ? `${variant.blur} ${variant.saturate}` : 'none',
        WebkitBackdropFilter: isVisible ? `${variant.blur} ${variant.saturate}` : 'none',
        backgroundColor: `var(--anchor-glass-bg)`,
        borderColor: `var(--anchor-glass-border)`,
        boxShadow: glow
          ? `0 8px 32px ${glowColors[glowColor] || glowColors.teal}, 0 4px 16px rgba(0,0,0,${variant.shadowOpacity})`
          : `0 4px 16px rgba(0,0,0,${variant.shadowOpacity})`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const MemoGlass = memo(Glass);
export default MemoGlass;
