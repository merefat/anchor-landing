'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TEAL = '#1ebbd4';
const AMBER = '#f89c11';
const PURPLE = '#a855f7';

const DOMAINS = [
  { label: 'Calendar', color: TEAL },
  { label: 'Bank', color: AMBER },
  { label: 'Habits', color: TEAL },
  { label: 'Family', color: PURPLE },
  { label: 'Budget', color: AMBER },
  { label: 'AI', color: PURPLE },
];

export default function ConstellationNetwork({ className = '' }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
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
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const nodes = useMemo(() => {
    const { width, height } = dimensions;
    return DOMAINS.map((domain, i) => {
      const angle = (i / DOMAINS.length) * Math.PI * 2;
      const radius = Math.min(width, height) * (0.28 + (i % 3) * 0.04);
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      return { ...domain, x, y, size: 4 + (i % 3) * 2 };
    });
  }, [dimensions]);

  const connections = useMemo(() => {
    const links = [];
    const threshold = Math.min(dimensions.width, dimensions.height) * 0.6;
    const thresholdSq = threshold * threshold;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < thresholdSq) {
          links.push({ from: nodes[i], to: nodes[j], i, j });
        }
      }
    }
    return links;
  }, [nodes, dimensions]);

  const travelingParticles = useMemo(() => {
    return connections.slice(0, Math.min(connections.length, 4)).map((c, i) => ({
      ...c,
      delay: i * 1.2,
      duration: 3 + (i % 3) * 1,
    }));
  }, [connections]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg className="w-full h-full" style={{ opacity: 0.8 }}>
        <defs>
          <linearGradient id="constellation-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0" />
            <stop offset="50%" stopColor={TEAL} stopOpacity="0.5" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </linearGradient>
        </defs>

        {connections.map((link, idx) => (
          <line
            key={`link-${idx}`}
            x1={link.from.x}
            y1={link.from.y}
            x2={link.to.x}
            y2={link.to.y}
            stroke="url(#constellation-line)"
            strokeWidth="0.5"
            opacity={0.4}
          />
        ))}

        {reducedMotion !== true &&
          travelingParticles.map((link, idx) => (
            <motion.circle
              key={`pulse-${idx}`}
              r="3"
              fill={link.from.color}
              filter="drop-shadow(0 0 4px currentColor)"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{
                duration: link.duration,
                repeat: Infinity,
                delay: link.delay,
                ease: 'linear',
              }}
              style={{
                offsetPath: `path('M ${link.from.x} ${link.from.y} L ${link.to.x} ${link.to.y}')`,
              }}
            />
          ))}

        {nodes.map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              style={{
                filter: `drop-shadow(0 0 6px ${node.color})`,
                x: reducedMotion ? 0 : springX,
                y: reducedMotion ? 0 : springY,
              }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      r: [node.size, node.size * 1.5, node.size],
                      opacity: [0.7, 1, 0.7],
                    }
              }
              transition={{
                duration: 3 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
            <text
              x={node.x}
              y={node.y + node.size + 16}
              textAnchor="middle"
              fill="currentColor"
              className="text-[9px] uppercase tracking-wider font-medium"
              style={{
                fill: node.color,
                opacity: 0.7,
                x: reducedMotion ? 0 : springX,
                y: reducedMotion ? 0 : springY,
              }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
