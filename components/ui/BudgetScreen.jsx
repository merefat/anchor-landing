'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BudgetScreen({ isActive = false, onHoverCategory = null }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [net, setNet] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(0);

  const categories = [
    { name: 'Housing', allocated: 1200, spent: 950, color: '#f89c11' },
    { name: 'Food', allocated: 600, spent: 420, color: '#1ebbd4' },
    { name: 'Transport', allocated: 300, spent: 180, color: '#f89c11' },
    { name: 'Utilities', allocated: 200, spent: 150, color: '#94a3b8' },
  ];

  const transactions = [
    { desc: 'Grocery Store', amount: '-$74.50', date: 'Today' },
    { desc: 'Client Payment', amount: '+$2,400', date: 'Yesterday' },
    { desc: 'Side Hustle', amount: '+$350', date: 'Yesterday' },
    { desc: 'Salary', amount: '+$3,200', date: 'May 1' },
    { desc: 'Online Course', amount: '-$199', date: 'Apr 28' },
  ];

  const savingsGoals = [
    { name: 'Emergency Fund', progress: 75 },
    { name: 'Vacation', progress: 45 },
    { name: 'New Car', progress: 30 },
  ];

  // Count-up animation for summary using rAF
  useEffect(() => {
    if (!isActive) return;
    
    const duration = 1500;
    let startTime = null;
    let rafId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setIncome(Math.floor(5600 * progress));
      setExpenses(Math.floor(3450 * progress));
      setNet(Math.floor(2090 * progress));
      
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [isActive]);

  // Transaction loop
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTransactionIndex((prev) => (prev + 1) % transactions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, transactions.length]);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    if (onHoverCategory) onHoverCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    if (onHoverCategory) onHoverCategory(null);
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ 
      background: '#08080f',
      maxWidth: '100%',
      maxHeight: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header with live dot */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(30, 187, 212, 0.2)' }}>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: '#1ebbd4' }}
          />
          <h2 className="text-lg font-semibold" style={{ color: '#ffffff' }}>
            Budget
          </h2>
        </div>
        <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          May 2025
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.06)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px'
          }}
        >
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Income</div>
              <div className="text-sm font-semibold font-mono" style={{ color: '#ffffff' }}>
                ${income.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Expenses</div>
              <div className="text-sm font-semibold font-mono" style={{ color: '#ffffff' }}>
                ${expenses.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Net</div>
              <div className="text-sm font-semibold font-mono" style={{ color: '#1ebbd4' }}>
                +${net.toLocaleString()}
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="h-12 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 70, 60, 85, 50, 75, 65, 90].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={isActive ? { height: `${height}%` } : { height: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                className="flex-1 rounded-t"
                style={{ background: index % 2 === 0 ? '#1ebbd4' : '#f89c11' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Safe Surplus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-3 rounded-xl flex items-center gap-3"
          style={{ 
            background: 'rgba(30, 187, 212, 0.1)', 
            border: '1px solid rgba(30, 187, 212, 0.3)',
            borderRadius: '20px'
          }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(30, 187, 212, 0.2)' }}>
            <span style={{ color: '#1ebbd4' }}>✓</span>
          </div>
          <div className="text-sm" style={{ color: '#ffffff' }}>
            You're on track with your budget
          </div>
        </motion.div>

        {/* Category Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-4 rounded-2xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.06)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px'
          }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#ffffff' }}>
            Budget by Category
          </h3>
          <div className="space-y-3">
            {categories.map((cat, index) => (
              <div 
                key={index}
                onMouseEnter={() => handleCategoryHover(cat)}
                onMouseLeave={handleCategoryLeave}
                className="cursor-pointer"
              >
                <div className="flex justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{cat.name}</span>
                  </div>
                  <span style={{ color: '#ffffff' }}>
                    ${cat.spent} / ${cat.allocated}
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'rgba(30, 187, 212, 0.2)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isActive ? { width: `${(cat.spent / cat.allocated) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-4 rounded-2xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.06)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#ffffff' }}>
            Recent Transactions
          </h3>
          <div className="space-y-2 h-32 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {transactions.map((tx, index) => {
                const displayIndex = (currentTransactionIndex + index) % transactions.length;
                const txData = transactions[displayIndex];
                return (
                  <motion.div
                    key={`${displayIndex}-${currentTransactionIndex}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-2 rounded-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <div>
                      <div className="text-xs font-medium" style={{ color: '#ffffff' }}>
                        {txData.desc}
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {txData.date}
                      </div>
                    </div>
                    <div className="text-sm font-mono" style={{ 
                      color: txData.amount.startsWith('+') ? '#1ebbd4' : '#ffffff' 
                    }}>
                      {txData.amount}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Savings Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-4 rounded-2xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.06)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px'
          }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#ffffff' }}>
            Savings Goals
          </h3>
          <div className="space-y-3">
            {savingsGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{goal.name}</span>
                  <span style={{ color: '#ffffff' }}>{goal.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'rgba(30, 187, 212, 0.2)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isActive ? { width: `${goal.progress}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.15 }}
                    className="h-full rounded-full"
                    style={{ background: '#1ebbd4' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
