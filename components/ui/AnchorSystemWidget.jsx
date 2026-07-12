'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

const RADIUS = 42;

const ACTIVITIES = [
  { hour: 6, label: 'Wake-up', color: 'teal' },
  { hour: 10, label: 'Meeting', color: 'amber' },
  { hour: 12, label: 'Lunch', color: 'teal' },
  { hour: 18, label: 'Workout', color: 'amber' },
  { hour: 20, label: 'Budget', color: 'teal' },
];

const TICKS = Array.from({ length: 12 }, (_, i) => i);
const ANCHOR_DOTS = Array.from({ length: 12 }, (_, i) => i);

export default function AnchorSystemWidget() {
  const cardRef = useRef(null);
  const specularRef = useRef(null);
  const rafRef = useRef(null);
  const isMobile = useIsMobile();

  const [time, setTime] = useState({ h: 0, m: 0, s: 0, h12: 0, label: '00:00 AM', date: '—' });
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const checkTheme = () => {
      const siteTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(siteTheme);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const h12 = h % 12;

      const hh = String(h12 === 0 ? 12 : h12).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';

      setTime({
        h,
        m,
        s,
        h12,
        label: `${hh}:${mm} ${ampm}`,
        date: now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 12;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
      if (specularRef.current) {
        specularRef.current.style.setProperty('--mx', `${px * 100}%`);
        specularRef.current.style.setProperty('--my', `${py * 100}%`);
      }
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    const card = cardRef.current;
    if (card) card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  }, [isMobile]);

  const hourDeg = (time.h12 + time.m / 60) * 30;
  const minDeg = (time.m + time.s / 60) * 6;
  const secDeg = time.s * 6;

  return (
    <div className="anchor-scene" data-theme={theme}>
      <div className="anchor-scene-perspective">
        <div
          ref={cardRef}
          className="anchor-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={specularRef} className="specular" />

          <div className="face">
            <div className="ring-track" />

            {/* Tick marks */}
            {TICKS.map((i) => (
              <div
                key={`tick-${i}`}
                className="tick"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}

            {/* Anchor dots */}
            {ANCHOR_DOTS.map((i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 50 + RADIUS * Math.cos(angle);
              const y = 50 + RADIUS * Math.sin(angle);
              const activity = ACTIVITIES.find((a) => a.hour === i);
              const colorClass = activity
                ? activity.color
                : i % 2 === 0
                  ? 'amber'
                  : 'teal';
              const isActive = i === time.h12;
              return (
                <div
                  key={`anchor-${i}`}
                  className={`anchor ${colorClass} ${isActive ? 'active' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              );
            })}

            {/* Activity labels */}
            {ACTIVITIES.map((activity) => {
              const angle = (activity.hour * 30 - 90) * (Math.PI / 180);
              const x = 50 + (RADIUS + 12) * Math.cos(angle);
              const y = 50 + (RADIUS + 12) * Math.sin(angle);
              return (
                <div
                  key={`label-${activity.hour}`}
                  className={`activity-label ${activity.color}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {activity.label}
                </div>
              );
            })}

            {/* Clock hands */}
            <div className="hand hand-hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
            <div className="hand hand-minute" style={{ transform: `rotate(${minDeg}deg)` }} />
            <div className="hand hand-second" style={{ transform: `rotate(${secDeg}deg)` }} />

            <div className="hub" />

            {/* Digital readout */}
            <div className="readout">
              <div className="time-text">{time.label}</div>
              <div className="date-text">{time.date}</div>
            </div>
          </div>

          <div className="brand">
            <span className="glyph" />
            Anchor
          </div>
        </div>
      </div>
    </div>
  );
}
