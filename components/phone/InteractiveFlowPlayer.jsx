'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar, Target, Anchor, Building2,
  ChevronRight, Check, Clock,
  ArrowLeft, Sparkles, PartyPopper,
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'plan', title: 'Create a Plan', desc: 'Build your daily timeline', icon: Calendar, color: '#1ebbd4' },
  { id: 'habit', title: 'Build a Habit', desc: 'Start a new streak today', icon: Target, color: '#1ebbd4' },
  { id: 'anchor', title: 'Set an Anchor', desc: 'Lock non-negotiable time', icon: Anchor, color: '#f89c11' },
  { id: 'bank', title: 'Connect Your Bank', desc: 'Secure bank-grade link', icon: Building2, color: '#1ebbd4' },
];

export default function InteractiveFlowPlayer() {
  const [activeFlow, setActiveFlow] = useState(null);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'var(--anchor-bg-dark)' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] text-anchor-text-muted">
        <span>9:41</span>
        <span>Anchor</span>
      </div>

      {/* Content */}
      <div
        className="flex-1 relative overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence mode="wait">
          {activeFlow === null ? (
            <MenuScreen key="menu" onSelect={setActiveFlow} />
          ) : activeFlow === 'plan' ? (
            <PlanFlowInteractive key="plan" onBack={() => setActiveFlow(null)} />
          ) : activeFlow === 'habit' ? (
            <HabitFlowInteractive key="habit" onBack={() => setActiveFlow(null)} />
          ) : activeFlow === 'anchor' ? (
            <AnchorFlowInteractive key="anchor" onBack={() => setActiveFlow(null)} />
          ) : activeFlow === 'bank' ? (
            <BankFlowInteractive key="bank" onBack={() => setActiveFlow(null)} />
          ) : null}
        </AnimatePresence>
      </div>

      {/* Footer label */}
      <div className="px-4 pb-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-anchor-text-muted">Interactive Demo</span>
          <span className="text-[10px] font-medium text-anchor-amber flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Try it yourself
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========== Menu Screen ========== */
function MenuScreen({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full flex flex-col"
    >
      <div className="text-xs text-anchor-text-muted mb-1">Welcome to Anchor</div>
      <div className="text-sm font-bold text-white mb-4">What would you like to try?</div>

      <div className="space-y-2.5 flex-1">
        {MENU_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(item.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">{item.title}</div>
                <div className="text-[10px] text-anchor-text-muted">{item.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-anchor-text-muted shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ========== Shared Flow Header ========== */
function FlowHeader({ title, onBack, stepLabel }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-white/10"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-anchor-text-muted" />
      </motion.button>
      <div className="flex-1">
        <div className="text-sm font-bold text-white">{title}</div>
        {stepLabel && <div className="text-[10px] text-anchor-text-muted">{stepLabel}</div>}
      </div>
    </div>
  );
}

/* ========== Step Navigation ========== */
function StepDots({ total, current }) {
  return (
    <div className="flex gap-1.5 mb-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-full transition-all"
          style={{
            background: i <= current ? 'var(--anchor-teal)' : 'rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  );
}

function NextButton({ onClick, label = 'Next', color = '#1ebbd4' }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full py-2.5 rounded-xl text-xs font-semibold text-white transition-all"
      style={{ background: color }}
    >
      {label}
    </motion.button>
  );
}

/* ========== Interactive Flow: Create a Plan ========== */
function PlanFlowInteractive({ onBack }) {
  const [step, setStep] = useState(0);
  const [planName, setPlanName] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);

  const suggestedNames = ['Productive Tuesday', 'Morning Routine', 'Deep Work Day'];
  const timeSlots = ['07:00', '09:00', '12:30', '15:00', '18:00', '22:00'];

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full flex flex-col"
    >
      <FlowHeader title="Create a Plan" onBack={onBack} stepLabel={`Step ${step + 1} of 3`} />
      <StepDots total={3} current={step} />

      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Name your plan</div>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Type a name..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-anchor-teal mb-3"
            autoFocus
          />
          <div className="text-[10px] text-anchor-text-muted mb-2">Or try a suggestion:</div>
          <div className="space-y-2">
            {suggestedNames.map((name) => (
              <motion.button
                key={name}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPlanName(name)}
                className="w-full text-left p-2.5 rounded-lg text-xs text-white"
                style={{
                  background: planName === name ? 'rgba(30,187,212,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${planName === name ? 'rgba(30,187,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {name}
              </motion.button>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(1)} label={planName ? 'Next' : 'Pick a name first'} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Tap time slots to add anchors</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {timeSlots.map((slot) => {
              const selected = selectedSlots.includes(slot);
              return (
                <motion.button
                  key={slot}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSlot(slot)}
                  className="py-2.5 rounded-lg text-[11px] font-mono font-medium transition-all"
                  style={{
                    background: selected ? 'rgba(30,187,212,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selected ? 'rgba(30,187,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: selected ? '#1ebbd4' : '#888',
                  }}
                >
                  {slot}
                </motion.button>
              );
            })}
          </div>
          {selectedSlots.length > 0 && (
            <div className="text-[10px] text-anchor-text-muted mb-2">
              {selectedSlots.length} anchor{selectedSlots.length > 1 ? 's' : ''} selected
            </div>
          )}
          <div className="mt-auto">
            <NextButton
              onClick={() => setStep(2)}
              label={selectedSlots.length > 0 ? 'Next' : 'Select at least one'}
              color={selectedSlots.length > 0 ? '#1ebbd4' : '#555'}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Your plan: {planName || 'Untitled'}</div>
          <div className="space-y-1.5 flex-1">
            {selectedSlots.sort().map((slot) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: 'rgba(30,187,212,0.1)', border: '1px solid rgba(30,187,212,0.3)' }}
              >
                <Clock className="w-3 h-3 text-anchor-teal" />
                <span className="text-[11px] font-mono text-anchor-teal">{slot}</span>
                <span className="text-[10px] text-white">Anchor point</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(3)} label="Create Plan" />
          </div>
        </div>
      )}

      {step === 3 && (
        <SuccessScreen
          title="Plan Created!"
          desc={`"${planName || 'Untitled'}" with ${selectedSlots.length} anchors`}
          onBack={onBack}
        />
      )}
    </motion.div>
  );
}

/* ========== Interactive Flow: Build a Habit ========== */
function HabitFlowInteractive({ onBack }) {
  const [step, setStep] = useState(0);
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [streak, setStreak] = useState(0);
  const [marked, setMarked] = useState(false);

  const suggestions = ['Morning Meditation', 'Read 30 mins', 'Exercise', 'Journal', 'Drink Water'];
  const frequencies = ['Daily', 'Weekdays', 'Custom'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full flex flex-col"
    >
      <FlowHeader title="Build a Habit" onBack={onBack} stepLabel={`Step ${step + 1} of 3`} />
      <StepDots total={3} current={step} />

      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Pick a habit or type your own</div>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Custom habit..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-anchor-teal mb-3"
            autoFocus
          />
          <div className="space-y-2">
            {suggestions.map((name) => (
              <motion.button
                key={name}
                whileTap={{ scale: 0.97 }}
                onClick={() => setHabitName(name)}
                className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-xs text-white"
                style={{
                  background: habitName === name ? 'rgba(30,187,212,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${habitName === name ? 'rgba(30,187,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <Target className="w-3.5 h-3.5 text-anchor-teal" />
                {name}
              </motion.button>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(1)} label={habitName ? 'Next' : 'Pick a habit'} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">How often?</div>
          <div className="flex gap-2 mb-4">
            {frequencies.map((freq) => (
              <motion.button
                key={freq}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFrequency(freq)}
                className="flex-1 py-2.5 rounded-xl text-[11px] font-medium transition-all"
                style={{
                  background: frequency === freq ? 'rgba(30,187,212,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${frequency === freq ? 'rgba(30,187,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: frequency === freq ? '#1ebbd4' : '#888',
                }}
              >
                {freq}
              </motion.button>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(2)} label="Next" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 mb-4"
            style={{ background: 'rgba(30,187,212,0.1)', border: '1px solid rgba(30,187,212,0.3)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-anchor-teal/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-anchor-teal" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white font-medium">{habitName}</div>
                <div className="text-[10px] text-anchor-text-muted">{frequency}</div>
              </div>
              <motion.div
                key={streak}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-anchor-teal"
              >
                {streak}
              </motion.div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!marked) {
                  setMarked(true);
                  setStreak(1);
                }
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: marked ? 'rgba(30,187,212,0.2)' : '#1ebbd4',
                color: '#fff',
                border: marked ? '1px solid rgba(30,187,212,0.4)' : 'none',
              }}
            >
              {marked ? '✓ Marked Done Today!' : 'Mark Done Today'}
            </motion.button>
          </motion.div>

          {marked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-xs text-anchor-teal"
            >
              <PartyPopper className="w-4 h-4" />
              1 day streak started!
            </motion.div>
          )}

          <div className="mt-auto">
            <NextButton onClick={() => setStep(3)} label="Done" />
          </div>
        </div>
      )}

      {step === 3 && (
        <SuccessScreen
          title="Habit Created!"
          desc={`"${habitName}" — ${frequency} — ${streak} day streak`}
          onBack={onBack}
        />
      )}
    </motion.div>
  );
}

/* ========== Interactive Flow: Set an Anchor ========== */
function AnchorFlowInteractive({ onBack }) {
  const [step, setStep] = useState(0);
  const [anchorType, setAnchorType] = useState(null);
  const [time, setTime] = useState('22:30');

  const types = [
    { label: 'Sleep', icon: '🌙', color: '#1ebbd4' },
    { label: 'Work', icon: '💼', color: '#f89c11' },
    { label: 'Family', icon: '👨‍👩‍👧', color: '#1ebbd4' },
    { label: 'Custom', icon: '⭐', color: '#f89c11' },
  ];

  const times = ['20:00', '21:00', '21:30', '22:00', '22:30', '23:00'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full flex flex-col"
    >
      <FlowHeader title="Set an Anchor" onBack={onBack} stepLabel={`Step ${step + 1} of 3`} />
      <StepDots total={3} current={step} />

      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Choose anchor type</div>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {types.map((type) => (
              <motion.button
                key={type.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnchorType(type)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                style={{
                  background: anchorType?.label === type.label ? `${type.color}15` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${anchorType?.label === type.label ? type.color + '40' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span className="text-2xl">{type.icon}</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: anchorType?.label === type.label ? '#fff' : '#888' }}
                >
                  {type.label}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton
              onClick={() => setStep(1)}
              label={anchorType ? 'Next' : 'Pick a type'}
              color={anchorType ? anchorType.color : '#555'}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Select time</div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="text-center text-3xl font-bold font-mono text-anchor-teal mb-3">
              {time}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <motion.button
                  key={t}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTime(t)}
                  className="py-2 rounded-lg text-[11px] font-mono transition-all"
                  style={{
                    background: time === t ? 'rgba(30,187,212,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${time === t ? 'rgba(30,187,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: time === t ? '#1ebbd4' : '#888',
                  }}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(2)} label="Next" color={anchorType?.color || '#1ebbd4'} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Preview</div>
          <div className="space-y-1.5 mb-4">
            {['07:00', '09:00', '18:00'].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-[10px] font-mono text-anchor-text-muted">{t}</span>
                <span className="text-[10px] text-anchor-text-muted">Existing block</span>
              </div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                background: `${anchorType?.color}15`,
                border: `1px solid ${anchorType?.color}40`,
              }}
            >
              <Anchor className="w-3 h-3" style={{ color: anchorType?.color }} />
              <span className="text-[10px] font-mono" style={{ color: anchorType?.color }}>{time}</span>
              <span className="text-[10px] text-white font-medium">{anchorType?.label} Anchor</span>
              <motion.div
                className="ml-auto w-2 h-2 rounded-full"
                style={{ background: anchorType?.color }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(3)} label="Lock Anchor" color={anchorType?.color || '#1ebbd4'} />
          </div>
        </div>
      )}

      {step === 3 && (
        <SuccessScreen
          title="Anchor Locked!"
          desc={`${anchorType?.label} at ${time} — anchored to your timeline`}
          color={anchorType?.color}
          onBack={onBack}
        />
      )}
    </motion.div>
  );
}

/* ========== Interactive Flow: Connect Bank ========== */
function BankFlowInteractive({ onBack }) {
  const [step, setStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);
  const [progress, setProgress] = useState(0);

  const banks = [
    { name: 'Chase', color: '#1ebbd4' },
    { name: 'Bank of America', color: '#f89c11' },
    { name: 'Wells Fargo', color: '#1ebbd4' },
  ];

  const transactions = [
    { desc: 'Coffee Shop', amount: '-$4.50' },
    { desc: 'Salary Deposit', amount: '+$3,200' },
    { desc: 'Grocery Store', amount: '-$62.30' },
    { desc: 'Gas Station', amount: '-$38.00' },
  ];

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full flex flex-col"
    >
      <FlowHeader title="Connect Bank" onBack={onBack} stepLabel={step < 2 ? `Step ${step + 1} of 3` : 'Complete'} />
      <StepDots total={3} current={step} />

      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-anchor-text-muted mb-2">Choose your bank</div>
          <div className="space-y-2.5">
            {banks.map((bank, i) => (
              <motion.button
                key={bank.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleBankSelect(bank)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${bank.color}15`, border: `1px solid ${bank.color}30` }}
                >
                  <Building2 className="w-5 h-5" style={{ color: bank.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white font-medium">{bank.name}</div>
                  <div className="text-[10px] text-anchor-text-muted">Tap to connect</div>
                </div>
                <ChevronRight className="w-4 h-4 text-anchor-text-muted" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <ConnectingScreen
          bank={selectedBank}
          onProgress={setProgress}
          onComplete={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-xl p-3 mb-4"
            style={{ background: `${selectedBank.color}10`, border: `1px solid ${selectedBank.color}30` }}
          >
            <Check className="w-4 h-4" style={{ color: selectedBank.color }} />
            <span className="text-xs text-white font-medium">{selectedBank.name} connected!</span>
          </motion.div>
          <div className="text-[10px] text-anchor-text-muted mb-2">Transactions flowing in:</div>
          <div className="space-y-1.5 flex-1">
            {transactions.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center justify-between p-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-[10px] text-white">{tx.desc}</span>
                <span
                  className="text-[10px] font-mono font-medium"
                  style={{ color: tx.amount.startsWith('+') ? '#1ebbd4' : '#fff' }}
                >
                  {tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto">
            <NextButton onClick={() => setStep(3)} label="Done" color={selectedBank.color} />
          </div>
        </div>
      )}

      {step === 3 && (
        <SuccessScreen
          title="Bank Connected!"
          desc={`${selectedBank.name} linked — transactions synced`}
          color={selectedBank.color}
          onBack={onBack}
        />
      )}
    </motion.div>
  );
}

/* ========== Connecting Screen ========== */
function ConnectingScreen({ bank, onProgress, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        onProgress(p + 5);
        return p + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: `${bank.color}15`, border: `2px solid ${bank.color}` }}
      >
        <Building2 className="w-8 h-8" style={{ color: bank.color }} />
      </motion.div>
      <div className="text-xs text-white font-medium mb-1">Connecting to {bank.name}...</div>
      <div className="text-[10px] text-anchor-text-muted mb-4">Bank-grade encryption</div>
      <div className="w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: bank.color }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.08 }}
        />
      </div>
    </div>
  );
}

/* ========== Success Screen ========== */
function SuccessScreen({ title, desc, color = '#1ebbd4', onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: `${color}20`, border: `2px solid ${color}` }}
      >
        <Check className="w-8 h-8" style={{ color }} />
      </motion.div>
      <div className="text-sm font-bold text-white mb-1">{title}</div>
      <div className="text-[10px] text-anchor-text-muted mb-6 px-4">{desc}</div>

      {/* Confetti particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: i % 2 === 0 ? '#1ebbd4' : '#f89c11',
            top: '40%',
            left: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            x: (i - 4) * 25,
            y: -40 - i * 5,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.05 }}
        />
      ))}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onBack}
        className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white"
        style={{ background: color }}
      >
        Back to Menu
      </motion.button>
    </motion.div>
  );
}
