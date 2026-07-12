'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlassDataCard({ 
  icon, 
  label, 
  value, 
  position = { x: 0, y: 0, z: 0 },
  delay = 0,
  isExpanded = false,
  onExpand 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: isExpanded ? 1.1 : 1,
        y: 0 
      }}
      transition={{ delay, duration: 0.5 }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translateZ(${position.z}px)`,
        transformStyle: 'preserve-3d'
      }}
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExpand}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered 
            ? '0 20px 40px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(124, 58, 237, 0.5)'
            : '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(124, 58, 237, 0.2)'
        }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl p-4 backdrop-blur-xl"
        style={{
          background: 'var(--anchor-card-dark)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          minWidth: '140px'
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">{icon}</div>
          <div className="text-xs font-medium" style={{ color: 'var(--anchor-text-muted-dark)' }}>
            {label}
          </div>
        </div>
        
        <div className="text-lg font-bold" style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--anchor-text-light)' }}>
          {value}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t"
              style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}
            >
              <div className="text-xs space-y-1" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                <div className="flex justify-between">
                  <span>This month</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>$1,240</span>
                </div>
                <div className="flex justify-between">
                  <span>Last month</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>$1,890</span>
                </div>
                <div className="flex justify-between" style={{ color: '#22c55e' }}>
                  <span>Saved</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>$650</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
