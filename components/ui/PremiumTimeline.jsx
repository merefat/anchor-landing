'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sun, Flame, Target } from 'lucide-react';

const anchorPoints = [
  { time: '06:30', label: 'Wake up', angle: 0, status: 'completed', duration: '30m' },
  { time: '07:00', label: 'Gym', angle: 30, status: 'completed', duration: '1h' },
  { time: '09:00', label: 'Standup', angle: 60, status: 'completed', duration: '30m' },
  { time: '10:00', label: 'Rent', angle: 90, status: 'completed', duration: '5m' },
  { time: '12:30', label: 'Lunch', angle: 120, status: 'completed', duration: '1h' },
  { time: '14:00', label: 'Deep work', angle: 150, status: 'active', duration: '2h' },
  { time: '16:00', label: 'Coffee', angle: 180, status: 'upcoming', duration: '30m' },
  { time: '18:00', label: 'Groceries', angle: 210, status: 'upcoming', duration: '1h' },
  { time: '19:00', label: 'Family time', angle: 240, status: 'upcoming', duration: '2h' },
  { time: '21:00', label: 'Read', angle: 270, status: 'upcoming', duration: '1h' },
  { time: '22:00', label: 'Wind down', angle: 300, status: 'upcoming', duration: '1h' },
  { time: '23:00', label: 'Sleep', angle: 330, status: 'upcoming', duration: '8h' },
];

// Color palette: One accent color (purple) + neutral + success
const COLORS = {
  primary: '#7c3aed', // Purple - progress, active anchor
  success: '#22c55e', // Green - completed anchors
  neutral: {
    light: 'rgba(255,255,255,0.98)',
    medium: 'rgba(255,255,255,0.85)',
    dark: 'rgba(255,255,255,0.65)',
    bg: '#181818', // Dark theme background (not pure black)
  }
};

export default function PremiumTimeline({ visibleCount = 12 }) {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dailyProgress, setDailyProgress] = useState(68);
  const [expandedAnchor, setExpandedAnchor] = useState(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const floatingVariants = {
    animate: {
      scale: [1, 1.015, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getCurrentTimeAngle = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const angle = (totalMinutes / (24 * 60)) * 360 - 90;
    return angle;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      aria-label="24-hour timeline showing daily progress and anchors"
    >
      {/* Ambient Background - Static, very subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Single very subtle purple glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-2xl"
          style={{ background: 'rgba(124,58,237,0.05)' }}
        />
      </div>

      {/* 3D Perspective Wrapper */}
      <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
        <motion.div
          className="relative"
          variants={floatingVariants}
          animate="animate"
          style={{
            rotateX: reducedMotion ? 0 : mousePosition.y * 4,
            rotateY: reducedMotion ? 0 : mousePosition.x * 4,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Time Wheel Container - Larger for better spacing */}
          <div className="relative" style={{ width: 480, height: 480 }}>
            {/* Background Ring - Subtle circular guide */}
            <svg className="absolute inset-0" viewBox="0 0 480 480" style={{ transform: 'translateZ(5px)' }}>
              {/* Background ring - Very subtle */}
              <circle
                cx="240" cy="240" r="180"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
              />
              
              {/* Hour markers */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
                const x1 = 240 + Math.cos(angle) * 178;
                const y1 = 240 + Math.sin(angle) * 178;
                const x2 = 240 + Math.cos(angle) * 182;
                const y2 = 240 + Math.sin(angle) * 182;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={i % 6 === 0 ? 1.5 : 0.5}
                  />
                );
              })}
            </svg>
            
            {/* Anchor Orbs - Reduced size (12px), no glow except active */}
            {anchorPoints.map((point, i) => {
              const angle = (point.angle / 360) * Math.PI * 2 - Math.PI / 2;
              const x = 240 + Math.cos(angle) * 180;
              const y = 240 + Math.sin(angle) * 180;
              const isVisible = i < visibleCount;
              const isActive = point.status === 'active';
              const isCompleted = point.status === 'completed';
              
              return (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%) translateZ(10px)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isVisible ? 1 : 0,
                    opacity: isVisible ? 1 : 0
                  }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedAnchor(expandedAnchor === i ? null : i)}
                  aria-label={`${point.time} - ${point.label}, ${point.status}`}
                >
                  {/* Anchor orb - Reduced size (12px), soft shadow */}
                  <div 
                    className="relative w-3 h-3 rounded-full"
                    style={{
                      background: isCompleted ? COLORS.success : 
                             isActive ? COLORS.primary : 
                             'rgba(255,255,255,0.4)',
                      boxShadow: isActive ? 
                        `0 4px 12px ${COLORS.primary}40` :
                        isCompleted ?
                        `0 2px 8px rgba(0,0,0,0.3)` :
                        `0 2px 6px rgba(0,0,0,0.2)`
                    }}
                  >
                    {/* Active anchor pulse - Only essential glow */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0.2, 0.6]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          border: `1.5px solid ${COLORS.primary}`,
                          background: 'transparent',
                          filter: 'url(#glow)'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Expanded Card on Click - Glass only for important cards */}
                  <AnimatePresence>
                    {expandedAnchor === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -12 }}
                        exit={{ opacity: 0, scale: 0.9, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2.5 rounded-xl min-w-[160px]"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                          zIndex: 100
                        }}
                      >
                        <div className="text-sm font-semibold mb-1" style={{ color: COLORS.neutral.light }}>
                          {point.time}
                        </div>
                        <div className="text-xs mb-2" style={{ color: COLORS.neutral.medium }}>
                          {point.label}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ 
                              background: isCompleted ? COLORS.success : 
                                     isActive ? COLORS.primary : 
                                     'rgba(255,255,255,0.4)'
                            }}
                          />
                          <span className="text-xs capitalize" style={{ color: COLORS.neutral.dark }}>
                            {point.status}
                          </span>
                        </div>
                        <div className="text-xs" style={{ color: COLORS.neutral.dark }}>
                          {point.duration}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            
            {/* Center Information Hub - Empty for clean design */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(15px)' }}>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Outer Information - Proper spacing, no overlap with progress ring */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top: Sunrise/Sunset - 24px clearance from ring */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          <Sun size={16} style={{ color: COLORS.neutral.medium }} />
          <span className="text-sm" style={{ color: COLORS.neutral.medium }}>
            06:32 / 20:15
          </span>
        </div>
        
        {/* Bottom: Statistics - 80px apart, 24px clearance */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-20">
          {/* Completed */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.success }} />
            <span className="text-sm" style={{ color: COLORS.neutral.medium }}>
              {anchorPoints.filter(p => p.status === 'completed').length} Completed
            </span>
          </div>
          
          {/* Streak */}
          <div className="flex items-center gap-3">
            <Flame size={16} style={{ color: COLORS.neutral.medium }} />
            <span className="text-sm" style={{ color: COLORS.neutral.medium }}>
              14 Day Streak
            </span>
          </div>
        </div>
        
        {/* Left: Today's Focus - 24px clearance from ring */}
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Target size={16} style={{ color: COLORS.neutral.medium }} />
          <span className="text-sm" style={{ color: COLORS.neutral.medium }}>
            Deep Work
          </span>
        </div>
      </div>
    </div>
  );
}
