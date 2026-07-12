'use client';

import { List, BarChart, Wallet, Settings } from 'lucide-react';

export default function AppNavigation({ activeScreen = 'timeline' }) {
  const navItems = [
    { id: 'timeline', icon: List, label: 'Timeline' },
    { id: 'insights', icon: BarChart, label: 'Stats' },
    { id: 'budget', icon: Wallet, label: 'Budget' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t" style={{ background: 'var(--anchor-bg-dark)', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeScreen === item.id ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <item.icon size={20} strokeWidth={2} style={{ color: activeScreen === item.id ? 'var(--anchor-purple)' : 'var(--anchor-text-muted-dark)' }} />
          <span className="text-xs" style={{ color: activeScreen === item.id ? 'var(--anchor-purple)' : 'var(--anchor-text-muted-dark)' }}>
            {item.label}
          </span>
          {activeScreen === item.id && (
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--anchor-purple)' }} />
          )}
        </div>
      ))}
    </div>
  );
}
