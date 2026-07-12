'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './LiveSystem.module.css';

export default function LiveSystem() {
  const cardRef = useRef(null);
  const [dark, setDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dayProgress, setDayProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);

  const CENTER = 100;
  const R = 90;
  const CIRC = 2 * Math.PI * R;

  const statuses = [
    'Syncing calendar…',
    "Deploying today's plan…",
    'Optimizing budget…',
    'Anchoring habits…',
    'Connecting family sync…',
    'Reconciling schedule…'
  ];

  const anchorPositions = [...Array(12)].map((_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    return {
      x: CENTER + R * Math.cos(angle),
      y: CENTER + R * Math.sin(angle),
      type: i % 2 === 0 ? 'amber' : 'teal'
    };
  });

  const pulseLines = [1, 4, 7, 10].map((idx, k) => {
    const p = anchorPositions[idx];
    const dirX = CENTER + (p.x - CENTER) * 0.34;
    const dirY = CENTER + (p.y - CENTER) * 0.34;
    return {
      x1: p.x,
      y1: p.y,
      x2: dirX,
      y2: dirY,
      type: idx % 4 === 0 ? 'teal' : 'amber',
      delay: k * 1.1
    };
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now);
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const secondsIntoDay = h * 3600 + m * 60 + s;
      setDayProgress(secondsIntoDay / 86400);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let statusIdx = 0;
    setStatusText(statuses[0]);
    setShowStatus(true);
    const rotateStatus = () => {
      setShowStatus(false);
      setTimeout(() => {
        statusIdx = (statusIdx + 1) % statuses.length;
        setStatusText(statuses[statusIdx]);
        setShowStatus(true);
      }, 400);
    };
    const interval = setInterval(rotateStatus, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeartbeat(false);
    const timeout = setTimeout(() => setHeartbeat(true), 10);
    const interval = setInterval(() => {
      setHeartbeat(false);
      setTimeout(() => setHeartbeat(true), 10);
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const formatTime = (date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const hh = String(h % 12 === 0 ? 12 : h % 12).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${hh}:${mm} ${ampm}`;
  };

  const rx = (mousePosition.y - 0.5) * -12;
  const ry = (mousePosition.x - 0.5) * 12;
  const activeIndex = currentTime.getHours() % 12;

  return (
    <div className={styles.liveSystem} data-theme={dark ? 'dark' : 'light'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={styles.scene}
      >
        <div className={styles.themeToggle} onClick={() => setDark(!dark)}>
          <span className={styles.dot} />
          <span>{dark ? 'Dark' : 'Light'}</span>
        </div>

        <div
          ref={cardRef}
          className={styles.card}
          style={{
            transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`,
            '--mx': `${mousePosition.x * 100}%`,
            '--my': `${mousePosition.y * 100}%`
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.specular} />

          <div className={styles.faceWrap}>
            <svg viewBox="0 0 200 200">
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="var(--amber)" />
                  <stop offset="100%" stop-color="var(--teal)" />
                </linearGradient>
                <radialGradient id="hubGradient" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stop-color="var(--amber)" />
                  <stop offset="100%" stop-color="var(--teal)" />
                </radialGradient>
              </defs>

              <circle className={styles.track} cx={CENTER} cy={CENTER} r={R} />

              <circle
                className={styles.progressArc}
                cx={CENTER}
                cy={CENTER}
                r={R}
                stroke="url(#arcGradient)"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * (1 - dayProgress)}
              />

              {pulseLines.map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  className={`${styles.pulseLine} ${line.type === 'teal' ? styles.teal : styles.amber}`}
                  style={{ animationDelay: `${line.delay}s` }}
                />
              ))}

              <g className={`${styles.orbit} ${styles.orbitA}`}>
                <circle className={`${styles.particle} ${styles.teal}`} cx="100" cy="14" r="2.1" />
              </g>
              <g className={`${styles.orbit} ${styles.orbitB}`}>
                <circle className={`${styles.particle} ${styles.amber}`} cx="100" cy="24" r="1.7" />
              </g>
              <g className={`${styles.orbit} ${styles.orbitC}`}>
                <circle className={`${styles.particle} ${styles.teal}`} cx="100" cy="8" r="1.4" />
              </g>

              {anchorPositions.map((anchor, i) => (
                <circle
                  key={i}
                  cx={anchor.x}
                  cy={anchor.y}
                  r={3.4}
                  className={`${styles.anchor} ${styles[anchor.type]} ${i === activeIndex ? styles.active : ''}`}
                />
              ))}

              <circle className={styles.coreRing} cx={CENTER} cy={CENTER} r="24" />
              <circle className={styles.coreFill} cx={CENTER} cy={CENTER} r="22" />

              <g className={styles.innerOrbit}>
                <circle className={styles.innerNode} cx="100" cy="82" r="1.2" />
                <circle className={styles.innerNode} cx="100" cy="118" r="1.2" />
              </g>

              <circle
                className={`${styles.heartbeatRing} ${heartbeat ? styles.fire : ''}`}
                cx={CENTER}
                cy={CENTER}
                r="24"
              />
              <circle className={styles.coreHub} cx={CENTER} cy={CENTER} r="9" />
            </svg>
          </div>

          <div className={styles.readout}>
            <div className={styles.timeText}>{formatTime(currentTime)}</div>
            <div className={styles.progressText}>{Math.round(dayProgress * 100)}% of day deployed</div>
          </div>

          <div className={styles.footer}>
            <div className={styles.brandRow}>
              <span className={styles.glyph} />
              <span>Anchor</span>
              <span className={styles.liveDot} />
            </div>
            <div className={`${styles.statusText} ${showStatus ? styles.show : ''}`}>{statusText}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
