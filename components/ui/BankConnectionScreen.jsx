'use client';

import { motion } from 'motion/react';
import { Building, Landmark, Lock } from 'lucide-react';

export default function BankConnectionScreen({ isActive = false }) {
  const banks = [
    { name: 'Bank A', icon: Building, color: '#7c3aed' },
    { name: 'Bank B', icon: Landmark, color: '#1ebbd4' },
    { name: 'Bank C', icon: Building, color: '#f89c11' },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
          Connect Your Bank
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--anchor-text-muted-dark)' }}>
          Securely link your accounts
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Lock icon with pulse */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--anchor-purple)' }}
          />
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(124, 58, 237, 0.2)', border: '2px solid var(--anchor-purple)' }}
          >
            <Lock size={32} strokeWidth={2} style={{ color: 'var(--anchor-purple)' }} />
          </div>
        </motion.div>

        {/* Bank selection */}
        <div className="w-full space-y-3">
          {banks.map((bank, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              style={{ 
                background: 'rgba(124, 58, 237, 0.1)', 
                border: '1px solid rgba(124, 58, 237, 0.2)' 
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: bank.color }}
              >
                <bank.icon size={20} strokeWidth={2} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: 'var(--anchor-text-light)' }}>
                  {bank.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  Tap to connect
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ background: bank.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <div className="text-xs mb-2" style={{ color: 'var(--anchor-text-muted-dark)' }}>
            Connecting securely...
          </div>
          <div className="w-48 h-1 rounded-full mx-auto" style={{ background: 'rgba(124, 58, 237, 0.2)' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={isActive ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full rounded-full"
              style={{ background: 'var(--anchor-purple)' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
