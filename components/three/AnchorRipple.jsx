'use client';

import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TEAL = '#1ebbd4';
const AMBER = '#f89c11';

const RIPPLE_POINTS = [
  { top: '15%', left: '10%', color: TEAL, delay: 0, duration: 4 },
  { top: '60%', left: '20%', color: AMBER, delay: 1.5, duration: 5 },
  { top: '30%', left: '70%', color: TEAL, delay: 0.8, duration: 4.5 },
  { top: '75%', left: '80%', color: AMBER, delay: 2.2, duration: 4 },
  { top: '45%', left: '45%', color: TEAL, delay: 3, duration: 6 },
  { top: '85%', left: '50%', color: AMBER, delay: 1, duration: 5.5 },
];

export default function AnchorRipple({ className = '' }) {
  const reducedMotion = useReducedMotion();

  const ripples = useMemo(() => RIPPLE_POINTS, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {ripples.map((ripple, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: ripple.top, left: ripple.left }}
        >
          {reducedMotion ? (
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: ripple.color, opacity: 0.2 }}
            />
          ) : (
            <>
              <div
                className="absolute rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  top: '-4px',
                  left: '-4px',
                  background: ripple.color,
                  opacity: 0.6,
                  boxShadow: `0 0 8px ${ripple.color}`,
                }}
              />
              <div
                className="absolute rounded-full border-2"
                style={{
                  width: '8px',
                  height: '8px',
                  top: '-4px',
                  left: '-4px',
                  borderColor: ripple.color,
                  animation: `anchor-ripple ${ripple.duration}s ease-out ${ripple.delay}s infinite`,
                }}
              />
              <div
                className="absolute rounded-full border"
                style={{
                  width: '8px',
                  height: '8px',
                  top: '-4px',
                  left: '-4px',
                  borderColor: ripple.color,
                  animation: `anchor-ripple ${ripple.duration}s ease-out ${ripple.delay + 1.5}s infinite`,
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
