'use client';

import { motion } from 'motion/react';
import { Utensils, Car, ShoppingCart, CreditCard, Lock, Check } from 'lucide-react';

export default function DataSyncScreen({ isActive = false }) {
  const transactions = [
    { icon: Utensils, name: 'Food & Dining', amount: '-$24.50', time: '2m ago' },
    { icon: Car, name: 'Transport', amount: '-$12.00', time: '1h ago' },
    { icon: ShoppingCart, name: 'Groceries', amount: '-$89.30', time: '3h ago' },
    { icon: CreditCard, name: 'Card Payment', amount: '+$2,400', time: 'Yesterday' },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--anchor-text-light)' }}>
          Syncing Transactions
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--anchor-text-muted-dark)' }}>
          Your data is secure and encrypted
        </p>
      </div>

      <div className="flex-1 flex flex-col p-4">
        {/* Sync progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="rgba(124, 58, 237, 0.2)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="var(--anchor-purple)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ strokeDasharray: '251.2', strokeDashoffset: 0 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Lock size={32} strokeWidth={2} style={{ color: 'var(--anchor-purple)' }} />
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium"
            style={{ color: 'var(--anchor-text-light)' }}
          >
            Syncing securely...
          </motion.div>
        </motion.div>

        {/* Transaction list */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {transactions.map((tx, index) => (
            <motion.div
              key={index}
              initial={{ x: 50, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(124, 58, 237, 0.2)' }}
              >
                <tx.icon size={20} strokeWidth={2} style={{ color: 'var(--anchor-purple)' }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: 'var(--anchor-text-light)' }}>
                  {tx.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--anchor-text-muted-dark)' }}>
                  {tx.time}
                </div>
              </div>
              <div className="text-sm font-semibold font-mono" style={{ 
                color: tx.amount.startsWith('+') ? '#22c55e' : 'var(--anchor-text-light)' 
              }}>
                {tx.amount}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sync complete indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-4 p-3 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
            <Check size={16} strokeWidth={2} style={{ color: '#22c55e' }} />
          </div>
          <div className="text-sm" style={{ color: 'var(--anchor-text-light)' }}>
            Sync complete
          </div>
        </motion.div>
      </div>
    </div>
  );
}
