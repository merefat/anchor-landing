'use client';

import { motion } from 'motion/react';
import { useTilt } from '@/hooks/useParallax';

export default function PhoneShell({
  children,
  showNav = false,
  navItems = [],
  activeNav = null,
  onNavChange = null,
  tiltIntensity = 1.0,
  size = 'normal',
  label = null,
}) {
  const tiltRef = useTilt(tiltIntensity);

  const sizeClasses = {
    large: 'w-[280px] rounded-[2.5rem] border-[3px] p-3 min-h-[520px]',
    normal: 'w-[280px] rounded-[2.5rem] border-[3px] p-3 min-h-[480px]',
    small: 'w-[200px] rounded-[2rem] border-[2px] p-2 min-h-[400px]',
  };
  const screenClasses = {
    large: 'rounded-[2rem] min-h-[460px]',
    normal: 'rounded-[2rem] min-h-[420px]',
    small: 'rounded-[1.5rem] min-h-[360px]',
  };
  const notchClasses = {
    large: 'w-20 h-5 top-3 rounded-b-2xl',
    normal: 'w-20 h-5 top-3 rounded-b-2xl',
    small: 'w-14 h-4 top-2 rounded-b-xl',
  };

  return (
    <div className="relative">
      {/* Label badge */}
      {label && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="glass-neon rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide text-anchor-text whitespace-nowrap">
            {label}
          </div>
        </div>
      )}

      <div
        ref={tiltRef}
        className={`app-phone relative ${sizeClasses[size]} border-anchor-border bg-anchor-base glass-neon`}
        data-theme="dark"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`absolute left-1/2 -translate-x-1/2 bg-anchor-base z-10 ${notchClasses[size]}`} />
        <div className={`app-screen bg-anchor-surface overflow-hidden relative ${screenClasses[size]}`}>
          {children}
          {showNav && navItems.length > 0 && (
            <PhoneBottomNav items={navItems} active={activeNav} onChange={onNavChange} />
          )}
        </div>
      </div>
    </div>
  );
}

function PhoneBottomNav({ items, active, onChange }) {
  return (
    <div className="app-bottom-nav absolute bottom-0 left-0 right-0 h-14 bg-anchor-surface/90 border-t border-anchor-border flex items-center justify-around px-2 z-10">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChange && onChange(item.id)}
            className={`app-nav-item flex flex-col items-center justify-center gap-0.5 flex-1 h-10 rounded-lg transition-all ${
              active === item.id ? 'text-anchor-teal' : 'text-anchor-text-muted'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="text-[9px] font-medium leading-none">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
