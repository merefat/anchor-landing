'use client';

import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import { useTilt, useParallax } from '@/hooks/useParallax';

const familyMembers = [
  { name: 'You', role: 'Admin', color: '#1ebbd4', angle: 0, size: 48 },
  { name: 'Sarah', role: 'Partner', color: '#f89c11', angle: 72, size: 36 },
  { name: 'Alex', role: 'Teen', color: '#1ebbd4', angle: 144, size: 32 },
  { name: 'Jordan', role: 'Kid', color: '#f89c11', angle: 216, size: 28 },
  { name: 'Mom', role: 'Parent', color: '#1ebbd4', angle: 288, size: 32 },
];

export default function FeatureFamily() {
  const center = 175;
  const orbitRadius = 120;
  const tiltRef = useTilt(0.8);
  const parallaxRef = useParallax(0.4);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual (reversed) */}
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center order-2 lg:order-1 transition-transform duration-300"
          >
            <Glass intensity="medium" glow glowColor="teal" className="relative rounded-full p-8">
              <motion.div ref={tiltRef} style={{ width: 350, height: 350 }}>
              <svg width="350" height="350" viewBox="0 0 350 350">
                {/* Orbit path */}
                <circle
                  cx={center}
                  cy={center}
                  r={orbitRadius}
                  fill="none"
                  stroke="var(--anchor-border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Connection lines with animated dash */}
                {familyMembers.slice(1).map((member, i) => {
                  const angle = (member.angle * Math.PI) / 180;
                  const x = center + Math.cos(angle) * orbitRadius;
                  const y = center + Math.sin(angle) * orbitRadius;
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke={member.color}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="6 4"
                      className="animate-drift"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}

                {/* Orbiting nodes */}
                <g style={{ transformOrigin: `${center}px ${center}px`, animation: 'idle-rotate 40s linear infinite' }}>
                  {familyMembers.slice(1).map((member, i) => {
                    const angle = (member.angle * Math.PI) / 180;
                    const x = center + Math.cos(angle) * orbitRadius;
                    const y = center + Math.sin(angle) * orbitRadius;
                    return (
                      <g key={i}>
                        <motion.circle
                          cx={x}
                          cy={y}
                          r={member.size / 2}
                          fill={member.color}
                          fillOpacity="0.15"
                          stroke={member.color}
                          strokeWidth="1.5"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                          style={{ transformOrigin: `${x}px ${y}px` }}
                        />
                        <text
                          x={x}
                          y={y - 2}
                          textAnchor="middle"
                          fill="var(--anchor-text)"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {member.name}
                        </text>
                        <text
                          x={x}
                          y={y + 10}
                          textAnchor="middle"
                          fill={member.color}
                          fontSize="8"
                        >
                          {member.role}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Center hub */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r="28"
                  fill="#1ebbd4"
                  fillOpacity="0.2"
                  stroke="#1ebbd4"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ transformOrigin: `${center}px ${center}px` }}
                />
                <text
                  x={center}
                  y={center - 2}
                  textAnchor="middle"
                  fill="var(--anchor-text)"
                  fontSize="11"
                  fontWeight="700"
                >
                  You
                </text>
                <text
                  x={center}
                  y={center + 10}
                  textAnchor="middle"
                  fill="#1ebbd4"
                  fontSize="8"
                >
                  Hub
                </text>

                {/* Sync indicator */}
                <text
                  x={center}
                  y={center + orbitRadius + 25}
                  textAnchor="middle"
                  fill="var(--anchor-text-muted)"
                  fontSize="9"
                >
                  ⟳ Live sync
                </text>
              </svg>
              </motion.div>
            </Glass>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2"
          >
            <Badge color="teal" className="mb-4">Family</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
              Add the people who share your life,{' '}
              <span className="text-anchor-teal">not just your calendar.</span>
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Everyone orbits the same hub. See your partner&apos;s schedule alongside
              yours, share budget categories, and track shared habits. Changes sync
              instantly — no more &quot;I thought you were picking up the kids.&quot;
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Shared timelines with individual privacy controls',
                'Family budget pools and personal spending',
                'Group habit challenges with collective streaks',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-anchor-text"
                >
                  <div className="w-5 h-5 rounded-full bg-anchor-teal/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-anchor-teal" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
