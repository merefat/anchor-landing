'use client';

import { motion } from 'motion/react';
import { Users, CreditCard, Wallet, Calendar, CheckCircle, CalendarSync, Bell, Palette, ChevronRight } from 'lucide-react';

export default function SettingsScreen({ isActive = false }) {
  const settings = [
    { icon: Users, label: 'Family', chevron: true },
    { icon: CreditCard, label: 'Plan', chevron: true },
    { icon: Wallet, label: 'Budget', chevron: true },
    { icon: Calendar, label: 'Schedule', chevron: true },
    { icon: CheckCircle, label: 'Habits', chevron: true },
    { icon: CalendarSync, label: 'Calendar Sync', chevron: true, badge: 'Coming soon' },
    { icon: Bell, label: 'Notifications', chevron: true },
    { icon: Palette, label: 'Theme', chevron: true },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--anchor-purple)' }}>
            <span className="text-white text-xl">OM</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
              Omar Mohammed
            </h2>
            <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>
              omar@example.com
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl flex items-center justify-between"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <div>
            <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>Current Plan</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
              Free Plan
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--anchor-purple)', color: 'white' }}>
            Upgrade
          </button>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          {settings.map((setting, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
              style={{ borderColor: 'rgba(124, 58, 237, 0.1)' }}
            >
              <div className="flex items-center gap-3">
                <setting.icon size={20} strokeWidth={2} style={{ color: 'var(--anchor-purple)' }} />
                <span className="text-sm" style={{ color: 'var(--anchor-text-light)' }}>
                  {setting.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {setting.badge && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--anchor-purple)' }}>
                    {setting.badge}
                  </span>
                )}
                {setting.chevron && (
                  <ChevronRight size={16} strokeWidth={2} style={{ color: 'var(--anchor-text-muted-dark)' }} />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Theme Toggle Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <div className="text-sm font-semibold mb-3" style={{ color: 'var(--anchor-text-light)' }}>
            Theme
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--anchor-purple)', color: 'white' }}>
              Dark
            </button>
            <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--anchor-text-light)' }}>
              Light
            </button>
            <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--anchor-text-light)' }}>
              System
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
