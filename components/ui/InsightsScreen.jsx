'use client';

import { motion } from 'motion/react';

export default function InsightsScreen({ isActive = false }) {
  const familyMembers = [
    { name: 'Omar', time: '75m', progress: 75 },
    { name: 'Aisha', time: '45m', progress: 45 },
    { name: 'Zaid', time: '80m', progress: 80 },
  ];

  const timeMix = [
    { label: 'Work', value: 45, color: '#7c3aed' },
    { label: 'Personal', value: 25, color: '#1ebbd4' },
    { label: 'Family', value: 20, color: '#f89c11' },
    { label: 'Other', value: 10, color: '#94a3b8' },
  ];

  const weeklyData = [65, 80, 72, 90, 85, 78, 88];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const moods = ['😊', '😊', '😐', '😊', '🙂', '😊', '😊', '😐', '😊', '🙂', '😊', '😊', '😊', '😊'];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
          Insights
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Family Time Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--anchor-text-light)' }}>
            Family Time Today
          </h3>
          <div className="flex justify-around">
            {familyMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18" cy="18" r="15"
                      fill="none"
                      stroke="rgba(124, 58, 237, 0.2)"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="18" cy="18" r="15"
                      fill="none"
                      stroke="var(--anchor-purple)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isActive ? { pathLength: member.progress / 100 } : { pathLength: 0 }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      style={{ strokeDasharray: '94.2', strokeDashoffset: 0 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
                      {member.time}
                    </span>
                  </div>
                </div>
                <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Time Mix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--anchor-text-light)' }}>
            Today's Time Mix
          </h3>
          <div className="space-y-2">
            {timeMix.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="text-xs w-12" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  {item.label}
                </div>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.2)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isActive ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--anchor-text-light)' }}>
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--anchor-text-light)' }}>
            Weekly Completion
          </h3>
          <div className="flex items-end justify-between h-24 gap-2">
            {weeklyData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={isActive ? { height: `${value}%` } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="w-full rounded-t"
                  style={{ background: 'var(--anchor-purple)' }}
                />
                <div className="text-xs mt-1" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  {days[index]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mood & Energy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--anchor-text-light)' }}>
            Mood & Energy (14 Days)
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {moods.map((mood, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                className="aspect-square flex items-center justify-center text-lg rounded"
                style={{ background: 'rgba(124, 58, 237, 0.1)' }}
              >
                {mood}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
