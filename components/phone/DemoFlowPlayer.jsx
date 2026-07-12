'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Target, Anchor, Building2, Check, Plus, Clock, Sparkles } from 'lucide-react';

const FLOWS = [
  { id: 'plan', label: 'Make a Plan', icon: Calendar, color: '#1ebbd4' },
  { id: 'habit', label: 'Add a Habit', icon: Target, color: '#1ebbd4' },
  { id: 'anchor', label: 'Set an Anchor', icon: Anchor, color: '#f89c11' },
  { id: 'bank', label: 'Connect Bank', icon: Building2, color: '#1ebbd4' },
];

const FLOW_DURATION = 5000;

export default function DemoFlowPlayer({ reducedMotion = false }) {
  const [currentFlow, setCurrentFlow] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      const interval = setInterval(() => {
        setCurrentFlow((prev) => (prev + 1) % FLOWS.length);
        setElapsed(0);
      }, FLOW_DURATION);
      return () => clearInterval(interval);
    }
    let startTime = null;
    let rafId;
    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const now = timestamp - startTime;
      setElapsed(now);
      if (now >= FLOW_DURATION) {
        setCurrentFlow((prev) => (prev + 1) % FLOWS.length);
        setElapsed(0);
        return; // stop current RAF; effect re-run starts a new one
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [currentFlow, reducedMotion]);

  const progress = Math.min(elapsed / FLOW_DURATION, 1);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] text-anchor-text-muted">
        <span>9:41</span>
        <span>Anchor</span>
      </div>

      {/* Flow content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFlow}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0"
          >
            {currentFlow === 0 && <PlanFlowDemo reducedMotion={reducedMotion} />}
            {currentFlow === 1 && <HabitFlowDemo reducedMotion={reducedMotion} />}
            {currentFlow === 2 && <AnchorFlowDemo reducedMotion={reducedMotion} />}
            {currentFlow === 3 && <BankFlowDemo reducedMotion={reducedMotion} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flow indicator */}
      <div className="px-4 pb-3 pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-anchor-text-muted">Auto Demo</span>
          <span className="text-[10px] font-medium text-anchor-teal">
            {FLOWS[currentFlow].label}
          </span>
        </div>
        <div className="flex gap-1.5">
          {FLOWS.map((flow, i) => (
            <div
              key={flow.id}
              className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              {i === currentFlow ? (
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: flow.color }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              ) : i < currentFlow ? (
                <div className="h-full rounded-full" style={{ background: flow.color, opacity: 0.4 }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== FLOW 1: Make a Plan ========== */
function PlanFlowDemo({ reducedMotion }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setStep(3); return; }
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const planBlocks = [
    { time: '07:00', label: 'Morning Run', color: '#1ebbd4' },
    { time: '09:00', label: 'Deep Work', color: '#f89c11' },
    { time: '12:30', label: 'Lunch Break', color: '#1ebbd4' },
    { time: '15:00', label: 'Team Sync', color: '#f89c11' },
    { time: '18:00', label: 'Family Time', color: '#1ebbd4' },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs text-anchor-text-muted mb-3">Create Plan</div>

      {/* Plan name input */}
      <div className="mb-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-[10px] text-anchor-text-muted mb-1">Plan Name</div>
          <div className="text-sm text-white font-medium">
            {step >= 1 ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Productive Tuesday
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: step === 1 ? Infinity : 0 }}
                  className="inline-block w-0.5 h-3 bg-anchor-teal ml-0.5 align-middle"
                />
              </motion.span>
            ) : (
              <span className="text-gray-500">Type a name...</span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline blocks */}
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="text-[10px] text-anchor-text-muted mb-1">Timeline</div>
        {planBlocks.map((block, i) => {
          const visible = step >= 2 && i < Math.min(step + 1, planBlocks.length);
          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    background: `${block.color}15`,
                    border: `1px solid ${block.color}30`,
                  }}
                >
                  <span className="text-[10px] font-mono" style={{ color: block.color }}>
                    {block.time}
                  </span>
                  <span className="text-xs text-white">{block.label}</span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Success */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 flex items-center gap-2 rounded-xl p-2.5"
            style={{ background: 'rgba(30, 187, 212, 0.1)', border: '1px solid rgba(30, 187, 212, 0.3)' }}
          >
            <Check className="w-4 h-4 text-anchor-teal" />
            <span className="text-xs text-white">Plan created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========== FLOW 2: Add a Habit ========== */
function HabitFlowDemo({ reducedMotion }) {
  const [step, setStep] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setStep(4); setStreak(12); return; }
    let streakInterval = null;
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1100),
      setTimeout(() => setStep(3), 1900),
      setTimeout(() => setStep(4), 2700),
      setTimeout(() => {
        streakInterval = setInterval(() => setStreak((s) => Math.min(s + 1, 12)), 70);
      }, 2900),
    ];
    return () => {
      timers.forEach(clearTimeout);
      if (streakInterval) clearInterval(streakInterval);
    };
  }, [reducedMotion]);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs text-anchor-text-muted mb-3">New Habit</div>

      {/* Add habit button */}
      <div className="mb-3">
        <motion.div
          animate={step === 0 ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 1.5, repeat: step === 0 ? Infinity : 0 }}
          className="flex items-center gap-2 rounded-xl p-3 border border-dashed border-anchor-teal/40 bg-anchor-teal/5"
        >
          <Plus className="w-4 h-4 text-anchor-teal" />
          <span className="text-xs text-anchor-teal">Add New Habit</span>
        </motion.div>
      </div>

      {/* Habit name input */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-[10px] text-anchor-text-muted mb-1">Habit Name</div>
              <div className="text-sm text-white font-medium">
                {step >= 2 ? 'Morning Meditation' : (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-0.5 h-3 bg-anchor-teal ml-0.5 align-middle"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frequency chips */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <div className="text-[10px] text-anchor-text-muted mb-2">Frequency</div>
            <div className="flex gap-2">
              {['Daily', 'Weekdays', 'Custom'].map((freq, i) => (
                <div
                  key={freq}
                  className={`text-[10px] px-3 py-1.5 rounded-full ${
                    i === 0
                      ? 'bg-anchor-teal text-white'
                      : 'bg-white/5 text-anchor-text-muted border border-white/10'
                  }`}
                >
                  {freq}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habit card with streak */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-3"
            style={{ background: 'rgba(30, 187, 212, 0.1)', border: '1px solid rgba(30, 187, 212, 0.3)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-anchor-teal/20 flex items-center justify-center">
                <Target className="w-4 h-4 text-anchor-teal" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white font-medium">Morning Meditation</div>
                <div className="text-[10px] text-anchor-text-muted">Daily</div>
              </div>
              <div className="text-right">
                <motion.div
                  key={streak}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-bold text-anchor-teal"
                >
                  {streak}
                </motion.div>
                <div className="text-[9px] text-anchor-text-muted">day streak</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto flex items-center gap-2 rounded-xl p-2.5"
            style={{ background: 'rgba(30, 187, 212, 0.1)', border: '1px solid rgba(30, 187, 212, 0.3)' }}
          >
            <Check className="w-4 h-4 text-anchor-teal" />
            <span className="text-xs text-white">Habit created! Streak started.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========== FLOW 3: Set an Anchor ========== */
function AnchorFlowDemo({ reducedMotion }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setStep(4); return; }
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1100),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const anchorTypes = [
    { label: 'Sleep', color: '#1ebbd4', selected: true },
    { label: 'Work', color: '#f89c11', selected: false },
    { label: 'Family', color: '#1ebbd4', selected: false },
    { label: 'Custom', color: '#f89c11', selected: false },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs text-anchor-text-muted mb-3">Add Anchor</div>

      {/* Anchor type grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {anchorTypes.map((type, i) => (
          <motion.div
            key={type.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-2 rounded-xl p-3 ${
              step >= 1 && type.selected
                ? 'ring-2'
                : ''
            }`}
            style={{
              background: step >= 1 && type.selected ? `${type.color}15` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${step >= 1 && type.selected ? type.color + '60' : 'rgba(255,255,255,0.08)'}`,
              borderColor: step >= 1 && type.selected ? type.color : undefined,
            }}
          >
            <Anchor className="w-4 h-4" style={{ color: step >= 1 && type.selected ? type.color : '#888' }} />
            <span className="text-xs" style={{ color: step >= 1 && type.selected ? '#fff' : '#888' }}>
              {type.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Time picker */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="text-[10px] text-anchor-text-muted mb-2">Set Time</div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-center gap-2">
              <motion.div
                animate={step === 2 ? { scale: [1, 1.1, 1] } : {} }
                transition={{ duration: 0.8, repeat: step === 2 ? Infinity : 0 }}
                className="text-2xl font-bold font-mono text-anchor-teal"
              >
                22:30
              </motion.div>
              <Clock className="w-4 h-4 text-anchor-text-muted" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline with anchor drop */}
      <div className="flex-1 space-y-1.5">
        <div className="text-[10px] text-anchor-text-muted mb-1">Timeline</div>
        {[
          { time: '07:00', label: 'Wake up', color: '#1ebbd4' },
          { time: '09:00', label: 'Work', color: '#f89c11' },
          { time: '18:00', label: 'Dinner', color: '#1ebbd4' },
        ].map((block, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5"
            style={{ background: `${block.color}10`, border: `1px solid ${block.color}20` }}
          >
            <span className="text-[10px] font-mono" style={{ color: block.color }}>{block.time}</span>
            <span className="text-[10px] text-white">{block.label}</span>
          </div>
        ))}

        {/* Anchor drops in */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
              style={{ background: '#f89c1115', border: '1px solid #f89c1140' }}
            >
              <Anchor className="w-3 h-3 text-anchor-amber" />
              <span className="text-[10px] font-mono text-anchor-amber">22:30</span>
              <span className="text-[10px] text-white font-medium">Sleep Anchor</span>
              {/* Ripple */}
              {step >= 3 && (
                <motion.div
                  className="absolute right-2 w-2 h-2 rounded-full"
                  style={{ background: '#f89c11' }}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 rounded-xl p-2.5"
            style={{ background: 'rgba(248, 156, 17, 0.1)', border: '1px solid rgba(248, 156, 17, 0.3)' }}
          >
            <Check className="w-4 h-4 text-anchor-amber" />
            <span className="text-xs text-white">Anchor locked to timeline!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========== FLOW 4: Connect Bank ========== */
function BankFlowDemo({ reducedMotion }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setStep(3); setProgress(100); return; }
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep(3);
          return 100;
        }
        return p + 5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [step]);

  const banks = [
    { name: 'Chase', color: '#1ebbd4', selected: true },
    { name: 'Bank of America', color: '#f89c11', selected: false },
    { name: 'Wells Fargo', color: '#1ebbd4', selected: false },
  ];

  const transactions = [
    { desc: 'Coffee Shop', amount: '-$4.50' },
    { desc: 'Salary', amount: '+$3,200' },
    { desc: 'Groceries', amount: '-$62.30' },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs text-anchor-text-muted mb-3">Connect Bank</div>

      {/* Bank list */}
      <div className="space-y-2 mb-4">
        {banks.map((bank, i) => (
          <motion.div
            key={bank.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              background: step >= 1 && bank.selected ? `${bank.color}15` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${step >= 1 && bank.selected ? bank.color + '40' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: bank.color + '20' }}
            >
              <Building2 className="w-4 h-4" style={{ color: bank.color }} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-white font-medium">{bank.name}</div>
              <div className="text-[10px] text-anchor-text-muted">
                {step >= 1 && bank.selected ? 'Selected' : 'Tap to connect'}
              </div>
            </div>
            {step >= 1 && bank.selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: bank.color }}
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {step >= 2 && step < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="text-[10px] text-anchor-text-muted mb-2">Connecting securely...</div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-anchor-teal to-anchor-teal"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connected + transactions */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 rounded-xl p-2.5 mb-3"
              style={{ background: 'rgba(30, 187, 212, 0.1)', border: '1px solid rgba(30, 187, 212, 0.3)' }}
            >
              <Check className="w-4 h-4 text-anchor-teal" />
              <span className="text-xs text-white">Chase connected!</span>
            </div>
            <div className="text-[10px] text-anchor-text-muted mb-2">Transactions</div>
            <div className="space-y-1.5">
              {transactions.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                >
                  <span className="text-[10px] text-white">{tx.desc}</span>
                  <span className="text-[10px] font-mono" style={{
                    color: tx.amount.startsWith('+') ? '#1ebbd4' : '#fff'
                  }}>
                    {tx.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
