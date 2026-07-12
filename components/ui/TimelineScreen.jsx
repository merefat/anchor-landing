'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Book, Briefcase, Laptop, Users, Anchor } from 'lucide-react';

export default function TimelineScreen({ isActive = false }) {
  const [timer, setTimer] = useState(24 * 60 + 36); // 24:36 in seconds

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 24 * 60 + 36));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activities = [
    { time: '05:30 - 06:00', label: 'Fajr Prayer', icon: Bell },
    { time: '06:00 - 07:00', label: 'Quran & Dhikr', icon: Book },
    { time: '07:00 - 10:00', label: 'Deep Work', icon: Briefcase, active: true },
    { time: '10:00 - 10:30', label: 'Dhuhr Prayer', icon: Bell },
    { time: '10:30 - 13:00', label: 'Work Block', icon: Laptop },
    { time: '13:00 - 14:00', label: 'Family Time', icon: Users },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--anchor-purple)' }}>
            <Anchor size={16} strokeWidth={2} color="white" />
          </div>
          <div>
            <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>Good morning,</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--anchor-text-light)' }}>Omar</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.2)' }} />
          <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.2)' }} />
        </div>
      </div>

      {/* Routine Tag */}
      <div className="px-4 py-2">
        <div className="text-xs px-2 py-1 rounded-full inline-block" style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--anchor-purple)' }}>
          Purposeful Living
        </div>
      </div>

      {/* Current Task */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mx-4 p-4 rounded-2xl mb-4"
        style={{ background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
            Deep Work
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-mono"
            style={{ color: 'var(--anchor-purple)' }}
          >
            {formatTime(timer)}
          </motion.div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--anchor-purple)', color: 'white' }}>
            Complete
          </button>
          <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--anchor-text-light)' }}>
            Partial
          </button>
          <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--anchor-text-muted-dark)' }}>
            Skip
          </button>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${activity.active ? 'ring-2' : ''}`}
              style={{
                background: activity.active ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: activity.active ? 'var(--anchor-purple)' : 'transparent'
              }}
            >
              <activity.icon size={20} strokeWidth={2} style={{ color: activity.active ? 'var(--anchor-purple)' : 'var(--anchor-text-muted-dark)' }} />
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: 'var(--anchor-text-light)' }}>
                  {activity.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  {activity.time}
                </div>
              </div>
              {activity.active && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--anchor-purple)' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
