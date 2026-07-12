'use client';

import { memo } from 'react';
import { motion } from 'motion/react';

const variants = {
  gradient: 'gradient-bg text-white glow-gradient',
  ghost: 'bg-transparent text-anchor-text-muted border border-anchor-border hover:border-anchor-text-muted hover:text-anchor-text',
  teal: 'bg-anchor-teal text-anchor-base font-semibold hover:brightness-110',
  amber: 'bg-anchor-amber text-anchor-base font-semibold hover:brightness-110',
  outline: 'bg-transparent text-anchor-text border border-anchor-border hover:border-anchor-text-muted',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

function Button({
  children,
  variant = 'gradient',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer select-none ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={base} onClick={onClick} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}

const MemoButton = memo(Button);
export default MemoButton;
