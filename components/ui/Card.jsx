'use client';

import { memo } from 'react';
import { motion } from 'motion/react';

function Card({
  children,
  className = '',
  glow = null,
  tilt = false,
  ...props
}) {
  const glowClass = glow === 'teal' ? 'glow-teal' : glow === 'amber' ? 'glow-amber' : '';

  return (
    <motion.div
      className={`glass rounded-2xl ${glowClass} ${className}`}
      {...(tilt && {
        whileHover: { y: -4 },
        transition: { type: 'spring', stiffness: 120, damping: 20 },
      })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const MemoCard = memo(Card);
export default MemoCard;
