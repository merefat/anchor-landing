'use client';

import { motion } from 'motion/react';
import { Building, Lock, DollarSign, TrendingUp } from 'lucide-react';

export default function GlassTokens({ isActive = false }) {
  const tokens = [
    { icon: Building, label: 'Bank', delay: 0, startX: -200, startY: -50, depth: 1, scale: 1.2 },
    { icon: Lock, label: 'Secure', delay: 0.1, startX: -150, startY: 50, depth: 2, scale: 1.0 },
    { icon: DollarSign, label: 'Money', delay: 0.2, startX: -100, startY: -100, depth: 3, scale: 0.8 },
    { icon: TrendingUp, label: 'Growth', delay: 0.3, startX: -180, startY: 100, depth: 1, scale: 1.1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {tokens.map((token, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            x: token.startX, 
            y: token.startY,
            scale: 0.5,
            z: token.depth * 10
          }}
          animate={isActive ? {
            opacity: [0, 1, 0],
            x: [token.startX, 0, 50],
            y: [token.startY, 0, 20],
            scale: [0.5, token.scale, token.scale * 0.8],
            z: [token.depth * 10, token.depth * 10, token.depth * 10]
          } : {
            opacity: 0,
            x: token.startX,
            y: token.startY,
            scale: 0.5,
            z: token.depth * 10
          }}
          transition={{
            duration: 2,
            delay: token.delay,
            times: [0, 0.6, 1],
            ease: 'easeInOut'
          }}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: token.depth
          }}
        >
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl"
              style={{
                background: `rgba(124, 58, 237, ${0.15 + token.depth * 0.05})`,
                border: `1px solid rgba(124, 58, 237, ${0.3 + token.depth * 0.1})`,
                boxShadow: `0 8px 32px rgba(124, 58, 237, ${0.15 + token.depth * 0.05})`,
                transform: `scale(${token.scale})`
              }}
            >
              <token.icon size={24} strokeWidth={2} style={{ color: 'var(--anchor-purple)' }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
