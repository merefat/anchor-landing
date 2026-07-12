'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';
import { useIsMobile } from '@/hooks/useIsMobile';
import BudgetScreen from './BudgetScreen';
import GlassTokens from './GlassTokens';

export default function AnchorAppPhone({ mousePosition }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [tokensActive, setTokensActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { containerRef } = useParallaxTilt();
  const phoneRef = useRef(null);

  // Trigger tokens animation on mount
  useEffect(() => {
    if (!reducedMotion) {
      setTokensActive(true);
      const timer = setTimeout(() => setTokensActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="relative w-[280px] h-[560px] rounded-[44px] p-2 overflow-hidden" style={{ 
        background: '#08080f',
        boxShadow: '0 0 0 1px rgba(255,255,255,.08), 0 24px 64px rgba(0,0,0,.7), 0 0 0 8px rgba(20,16,40,.6)',
        maxWidth: '100%',
        maxHeight: '100%'
      }}>
        <div className="w-full h-full rounded-[40px] overflow-hidden relative" style={{ 
          background: '#08080f',
          maxWidth: '100%',
          maxHeight: '100%',
          clipPath: 'inset(0 round 40px)'
        }}>
          <BudgetScreen isActive={true} />
        </div>
      </div>
    );
  }

  const tiltAmount = isMobile ? 0 : 8;
  const defaultRotation = isMobile ? 0 : -12;

  return (
    <div className="relative">
      {/* Glass tokens */}
      <GlassTokens isActive={tokensActive} />

      {/* Soft teal/amber glow under phone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30, 187, 212, 0.3) 0%, rgba(248, 156, 17, 0.2) 50%, transparent 70%)'
        }}
      />

      {/* Phone with real specs */}
      <motion.div
        ref={phoneRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-[280px] h-[560px] rounded-[44px] p-2 cursor-pointer preserve-3d overflow-hidden"
        style={{ 
          background: '#08080f',
          transform: `rotateY(${defaultRotation + mousePosition.x * tiltAmount}deg) rotateX(${mousePosition.y * 4}deg)`,
          transition: 'transform 0.1s ease-out',
          boxShadow: '0 0 0 1px rgba(255,255,255,.08), 0 24px 64px rgba(0,0,0,.7), 0 0 0 8px rgba(20,16,40,.6)',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        {/* Phone screen */}
        <div className="w-full h-full rounded-[40px] overflow-hidden relative" style={{ 
          background: '#08080f',
          maxWidth: '100%',
          maxHeight: '100%',
          clipPath: 'inset(0 round 40px)'
        }}>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-10" style={{ background: '#08080f' }}>
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 rounded-sm" style={{ background: 'rgba(255, 255, 255, 0.5)' }} />
            </div>
          </div>
          
          {/* Screen content */}
          <div className="absolute inset-0 pt-8 overflow-hidden" style={{ 
            maxWidth: '100%',
            maxHeight: '100%',
            boxSizing: 'border-box'
          }}>
            <BudgetScreen 
              isActive={true} 
              onHoverCategory={setHoveredCategory}
            />
          </div>
        </div>

        {/* Category tooltip */}
        <AnimatePresence>
          {hoveredCategory && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute right-[-140px] top-1/2 transform -translate-y-1/2 p-3 rounded-xl pointer-events-none"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px'
              }}
            >
              <div className="text-xs font-semibold mb-1" style={{ color: '#ffffff' }}>
                {hoveredCategory.name}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                ${hoveredCategory.spent} of ${hoveredCategory.allocated}
              </div>
              <div className="text-xs mt-1" style={{ color: hoveredCategory.color }}>
                {Math.round((hoveredCategory.spent / hoveredCategory.allocated) * 100)}% used
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
