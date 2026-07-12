'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

const state = {
  percent: 68,
  sunrise: "06:32",
  sunset: "20:15",
  completed: 5,
  streak: 14,
  dots: [
    { angle: 0,   status: "done"    },
    { angle: 40,  status: "done"    },
    { angle: 80,  status: "done"    },
    { angle: 120, status: "done"    },
    { angle: 160, status: "done"    },
    { angle: 200, status: "pending" },
    { angle: 240, status: "pending" },
    { angle: 280, status: "pending" },
    { angle: 320, status: "pending" },
  ]
};

const RADIUS = 205, CX = 240, CY = 240, CIRC = 2 * Math.PI * RADIUS;

function polar(angleDeg, r) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function DailyProgressCard() {
  const cardRef = useRef(null);
  const [clock, setClock] = useState(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  });
  const [ringOffset, setRingOffset] = useState(CIRC);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateClockAndCountdown = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(now.getHours() + 1, 0, 0, 0);
      const diffMs = next - now;
      const mm = String(Math.floor(diffMs / 60000)).padStart(2, '0');
      const ss = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, '0');
      setClock(`${mm}:${ss}`);
    };

    updateClockAndCountdown();
    const interval = setInterval(updateClockAndCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const offset = CIRC * (1 - state.percent / 100);
    setRingOffset(offset);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, rotateX: 28, rotateY: -18, translateZ: -160, scale: 0.9 }}
        animate={{ opacity: 1, rotateX: 0, rotateY: 0, translateZ: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative"
        style={{ 
          width: 520, 
          height: 520,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Halos */}
        <div className="absolute inset-0 rounded-full border" 
             style={{ 
               width: 470, 
               height: 470, 
               transform: 'translateZ(-40px)', 
               animation: 'spin 40s linear infinite',
               borderColor: 'var(--anchor-teal)',
               opacity: 0.22
             }} />
        <div className="absolute inset-0 rounded-full border border-dashed" 
             style={{ 
               width: 500, 
               height: 500, 
               transform: 'translateZ(-70px)', 
               animation: 'spin 60s linear infinite reverse',
               borderColor: 'var(--anchor-orange)',
               opacity: 0.18
             }} />

        <style jsx>{`
          @keyframes spin {
            to { transform: translateZ(-40px) rotate(360deg); }
          }
        `}</style>

        {/* Card */}
        <motion.div
          className="relative rounded-32"
          style={{
            width: 480,
            height: 480,
            background: 'var(--anchor-glass-bg)',
            border: '1px solid var(--anchor-glass-border)',
            backdropFilter: 'blur(22px) saturate(160%)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.3)',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${-mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(10px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Top-left sheen */}
          <div className="absolute inset-0 rounded-32 pointer-events-none" 
               style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent 35%)' }} />

          {/* SVG Ring */}
          <svg className="absolute inset-0" viewBox="0 0 480 480" style={{ transform: 'translateZ(20px)' }}>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--anchor-orange)"/>
                <stop offset="100%" stopColor="var(--anchor-teal)"/>
              </linearGradient>
            </defs>
            <circle cx="240" cy="240" r="205" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10"/>
            <circle cx="240" cy="240" r="205" fill="none" stroke="url(#ringGrad)"
              strokeWidth="10" strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={ringOffset}
              transform="rotate(-90 240 240)"
              style={{ filter: 'drop-shadow(0 0 10px var(--anchor-orange))' }} />
            
            {/* Dots */}
            {state.dots.map((d, i) => {
              const { x, y } = polar(d.angle, RADIUS);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={7}
                  fill={d.status === "done" ? "var(--anchor-teal)" : "var(--anchor-text-muted)"}
                  style={{ 
                    filter: 'drop-shadow(0 0 6px currentColor)',
                    animation: `pulse 2.4s ease-in-out infinite ${i * 0.15}s`
                  }}
                />
              );
            })}
          </svg>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { r: 7; opacity: 1; }
              50% { r: 8.4; opacity: 0.75; }
            }
          `}</style>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-10 text-center" 
               style={{ transform: 'translateZ(60px)' }}>
            {/* Sun pill */}
            <div className="absolute top-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                 style={{ 
                   background: 'rgba(255,255,255,0.08)',
                   border: '1px solid rgba(255,255,255,0.18)',
                   backdropFilter: 'blur(10px)',
                   boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(0,0,0,0.25)',
                   color: 'var(--anchor-text-muted)',
                   fontSize: '14px'
                 }}>
              ☀️ {state.sunrise} / {state.sunset}
            </div>

            {/* Clock */}
            <div className="text-6xl font-bold" 
                 style={{ 
                   color: 'var(--anchor-text)',
                   letterSpacing: '1px',
                   textShadow: '0 2px 24px var(--anchor-teal-glow)'
                 }}>
              {clock}
            </div>

            {/* Row pills */}
            <div className="flex gap-3 mt-1.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                   style={{ 
                     background: 'rgba(255,255,255,0.08)',
                     border: '1px solid rgba(255,255,255,0.18)',
                     backdropFilter: 'blur(10px)',
                     boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(0,0,0,0.25)',
                     color: 'var(--anchor-text-muted)',
                     fontSize: '14px'
                   }}>
                🎯 Deep Work
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                   style={{ 
                     background: 'rgba(255,255,255,0.08)',
                     border: '1px solid rgba(255,255,255,0.18)',
                     backdropFilter: 'blur(10px)',
                     boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(0,0,0,0.25)',
                     color: 'var(--anchor-text-muted)',
                     fontSize: '14px'
                   }}>
                🏅 Score: 92
              </div>
            </div>

            {/* Percent */}
            <div className="text-4xl font-bold mt-1"
                 style={{ 
                   background: 'linear-gradient(90deg, var(--anchor-orange), var(--anchor-teal))',
                   WebkitBackgroundClip: 'text',
                   backgroundClip: 'text',
                   color: 'transparent'
                 }}>
              {state.percent}%
            </div>
            <div className="text-sm" style={{ color: 'var(--anchor-text-muted)', marginTop: '-4px' }}>
              Daily Progress
            </div>

            {/* Session card */}
            <div className="mt-2.5 px-4.5 py-2.5 rounded-2xl"
                 style={{ 
                   background: 'linear-gradient(155deg, rgba(248,156,17,0.28), rgba(30,187,212,0.10))',
                   border: '1px solid var(--anchor-glass-border)',
                   backdropFilter: 'blur(14px)',
                   color: 'var(--anchor-text)',
                   boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 22px rgba(23,41,60,0.45)'
                 }}>
              <div className="text-xs" style={{ color: 'var(--anchor-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Next Session
              </div>
              <div className="flex items-center gap-2 font-bold text-base">
                ☕ 16:00 · Coffee
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6.5 mt-2.5 text-sm" style={{ color: 'var(--anchor-text-muted)' }}>
              <div>
                <div className="text-base font-bold" style={{ color: 'var(--anchor-text)' }}>{state.completed}</div>
                Completed
              </div>
              <div>
                <div className="text-base font-bold" style={{ color: 'var(--anchor-text)' }}>{state.streak} Day</div>
                Streak
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
