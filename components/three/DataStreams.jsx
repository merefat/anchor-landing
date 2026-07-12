'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TEAL = '#06D6FF';
const PURPLE = '#7B4DFF';
const AMBER = '#FFB000';

export default function DataStreams({ className = '' }) {
  const reducedMotion = useReducedMotion();

  const streams = useMemo(() => {
    const colors = [TEAL, PURPLE, AMBER, TEAL, AMBER, PURPLE, TEAL];
    return Array.from({ length: 7 }, (_, i) => {
      const top = 12 + i * 12;
      const duration = 8 + (i % 4) * 4;
      const particles = 3 + (i % 3);
      return {
        id: i,
        top: `${top}%`,
        color: colors[i % colors.length],
        duration,
        delay: i * 0.6,
        particles: Array.from({ length: particles }, (_, p) => ({
          id: p,
          delay: (p / particles) * duration,
        })),
      };
    });
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="absolute left-0 right-0 h-px"
          style={{
            top: stream.top,
            background: `linear-gradient(90deg, transparent, ${stream.color}30, transparent)`,
          }}
        >
          {reducedMotion !== true &&
            stream.particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute top-1/2 w-2 h-2 rounded-full"
                style={{
                  background: stream.color,
                  boxShadow: `0 0 10px ${stream.color}, 0 0 20px ${stream.color}`,
                  marginTop: '-4px',
                }}
                initial={{ left: '0%', opacity: 0, scale: 0.8 }}
                animate={{
                  left: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1.2, 1, 0.8],
                }}
                transition={{
                  duration: stream.duration,
                  repeat: Infinity,
                  delay: stream.delay + particle.delay,
                  ease: 'linear',
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            ))}

          {reducedMotion === true && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: stream.color,
                opacity: 0.3,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
