'use client';

import { motion } from 'motion/react';

export default function TutorialStep({ num, title, desc, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full glass-neon flex items-center justify-center text-sm font-bold text-anchor-teal">
        {num}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="w-4 h-4 text-anchor-amber" />}
          <h3 className="text-sm font-semibold text-anchor-text">{title}</h3>
        </div>
        <p className="text-xs text-anchor-text-muted leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
