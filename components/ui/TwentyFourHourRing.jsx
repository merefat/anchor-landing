'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

const RADIUS = 180;
const CX = 240;
const CY = 240;

// Sample anchor data - teal for time, amber for money
const anchors = [
  { hour: 6, type: 'time', label: 'Wake up' },
  { hour: 8, type: 'time', label: 'Meeting' },
  { hour: 10, type: 'money', label: 'Coffee' },
  { hour: 12, type: 'time', label: 'Lunch' },
  { hour: 14, type: 'time', label: 'Deep work' },
  { hour: 16, type: 'money', label: 'Groceries' },
  { hour: 18, type: 'time', label: 'Workout' },
  { hour: 20, type: 'money', label: 'Dinner' },
  { hour: 22, type: 'time', label: 'Reading' },
  { hour: 23, type: 'time', label: 'Sleep' },
  { hour: 7, type: 'money', label: 'Transport' },
  { hour: 15, type: 'money', label: 'Snack' },
];

function polarToCartesian(angleDeg, r) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function TwentyFourHourRing() {
  const [hoveredAnchor, setHoveredAnchor] = useState(null);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative"
        style={{ width: 480, height: 480 }}
      >
        {/* Background glow */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--anchor-teal) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />

        {/* SVG Ring */}
        <svg className="absolute inset-0" viewBox="0 0 480 480">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--anchor-teal)"/>
              <stop offset="100%" stopColor="var(--anchor-orange)"/>
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <circle 
            cx={CX} 
            cy={CY} 
            r={RADIUS} 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2"
          />

          {/* 24-hour tick marks */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15); // 360 / 24 = 15 degrees per hour
            const innerR = RADIUS - 10;
            const outerR = RADIUS + 10;
            const start = polarToCartesian(angle, innerR);
            const end = polarToCartesian(angle, outerR);
            
            return (
              <line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={i % 6 === 0 ? 2 : 1}
              />
            );
          })}

          {/* Anchor dots */}
          {anchors.map((anchor, i) => {
            const angle = (anchor.hour * 15); // Convert hour to degrees
            const pos = polarToCartesian(angle, RADIUS);
            const color = anchor.type === 'time' ? 'var(--anchor-teal)' : 'var(--anchor-amber)';
            
            return (
              <g key={i}>
                {/* Glow effect */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={12}
                  fill={color}
                  opacity={0.3}
                  style={{ filter: 'blur(8px)' }}
                />
                {/* Main dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={6}
                  fill={color}
                  style={{ 
                    filter: 'drop-shadow(0 0 8px currentColor)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredAnchor(anchor)}
                  onMouseLeave={() => setHoveredAnchor(null)}
                  className="transition-transform hover:scale-125"
                />
              </g>
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div 
            className="text-5xl font-bold"
            style={{ 
              color: 'var(--anchor-text)',
              textShadow: '0 2px 20px var(--anchor-teal-glow)'
            }}
          >
            24 hours
          </div>
          <div 
            className="text-lg mt-2"
            style={{ color: 'var(--anchor-text-muted)' }}
          >
            {anchors.length} anchors placed
          </div>
          
          {/* Hover tooltip */}
          {hoveredAnchor && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-20 px-4 py-2 rounded-lg"
              style={{
                background: 'var(--anchor-glass-bg)',
                border: '1px solid var(--anchor-glass-border)',
                backdropFilter: 'blur(10px)',
                color: 'var(--anchor-text)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-xs uppercase tracking-wider" style={{ color: hoveredAnchor.type === 'time' ? 'var(--anchor-teal)' : 'var(--anchor-amber)' }}>
                {hoveredAnchor.type}
              </div>
              <div className="font-semibold">{hoveredAnchor.label}</div>
              <div className="text-sm opacity-70">{hoveredAnchor.hour}:00</div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: 'var(--anchor-teal)', boxShadow: '0 0 8px var(--anchor-teal)' }}
            />
            <span className="text-sm" style={{ color: 'var(--anchor-text-muted)' }}>Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: 'var(--anchor-amber)', boxShadow: '0 0 8px var(--anchor-amber)' }}
            />
            <span className="text-sm" style={{ color: 'var(--anchor-text-muted)' }}>Money</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
