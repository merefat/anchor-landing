'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TEAL = '#1ebbd4';
const AMBER = '#f89c11';
const PURPLE = '#a855f7';

const ORBITS = [
  { radius: 120, label: 'Time', color: TEAL, speed: 20, nodes: 2 },
  { radius: 200, label: 'Money', color: AMBER, speed: 30, nodes: 3 },
  { radius: 280, label: 'Habits', color: PURPLE, speed: 40, nodes: 2 },
];

export default function LifeOrbit({ className = '' }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const cx = size.w / 2;
  const cy = size.h / 2;

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        style={reducedMotion ? {} : { x: springX, y: springY }}
        className="w-full h-full"
      >
        <svg className="w-full h-full" style={{ opacity: 0.7 }}>
          {/* Orbit rings */}
          {ORBITS.map((orbit, i) => (
            <circle
              key={`ring-${i}`}
              cx={cx}
              cy={cy}
              r={orbit.radius}
              fill="none"
              stroke={orbit.color}
              strokeWidth="1"
              opacity="0.15"
              strokeDasharray="4 8"
            />
          ))}

          {/* Central AI core */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="8"
            fill={TEAL}
            style={{ filter: `drop-shadow(0 0 12px ${TEAL})` }}
            animate={reducedMotion ? {} : { r: [8, 12, 8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r="20"
            fill="none"
            stroke={TEAL}
            strokeWidth="1"
            opacity="0.3"
            animate={reducedMotion ? {} : { r: [20, 40, 20], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* Orbit nodes */}
          {ORBITS.map((orbit, oi) =>
            Array.from({ length: orbit.nodes }).map((_, ni) => {
              const startAngle = (ni / orbit.nodes) * 360;
              return (
                <motion.g
                  key={`orbit-${oi}-node-${ni}`}
                  animate={reducedMotion ? {} : { rotate: 360 }}
                  transition={{
                    duration: orbit.speed,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: -(orbit.speed * startAngle) / 360,
                  }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  <motion.circle
                    cx={cx + orbit.radius}
                    cy={cy}
                    r="5"
                    fill={orbit.color}
                    style={{ filter: `drop-shadow(0 0 8px ${orbit.color})` }}
                    animate={{ r: [4, 6, 4], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ni * 0.5,
                    }}
                  />
                </motion.g>
              );
            })
          )}

          {/* Orbit labels */}
          {ORBITS.map((orbit, i) => (
            <text
              key={`label-${i}`}
              x={cx}
              y={cy - orbit.radius - 8}
              textAnchor="middle"
              className="text-[9px] uppercase tracking-wider font-medium"
              style={{ fill: orbit.color, opacity: 0.4 }}
            >
              {orbit.label}
            </text>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
