'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import Badge from '@/components/ui/Badge';
import Glass from '@/components/ui/Glass';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt, useParallax } from '@/hooks/useParallax';
import { RotateCcw, Send } from 'lucide-react';


const scenarios = [
  {
    id: 'gym',
    label: 'Move gym',
    prompt: 'Move my gym session to early morning and push lunch back an hour.',
    before: [
      { time: '09:00', label: 'Gym', color: 'teal' },
      { time: '12:00', label: 'Lunch', color: 'amber' },
      { time: '14:00', label: 'Deep work', color: 'gray' },
    ],
    after: [
      { time: '06:30', label: 'Gym', color: 'teal', moved: true, detail: 'Moved from 09:00 → 06:30' },
      { time: '13:00', label: 'Lunch', color: 'amber', moved: true, detail: 'Moved from 12:00 → 13:00' },
      { time: '14:00', label: 'Deep work', color: 'gray', detail: 'No change needed' },
    ],
    response: 'Done. Moved gym to 6:30 AM and pushed lunch to 1:00 PM. Your afternoon focus block stays put.',
  },
  {
    id: 'doctor',
    label: 'Doctor appt',
    prompt: 'I have a doctor appointment at 3pm, clear my afternoon.',
    before: [
      { time: '13:00', label: 'Lunch', color: 'amber' },
      { time: '14:00', label: 'Deep work', color: 'teal' },
      { time: '16:00', label: 'Team sync', color: 'gray' },
    ],
    after: [
      { time: '13:00', label: 'Lunch', color: 'amber', detail: 'No change needed' },
      { time: '15:00', label: 'Doctor', color: 'amber', moved: true, detail: 'Added by AI at 15:00' },
      { time: '16:00', label: 'Team sync', color: 'gray', detail: 'No change needed' },
    ],
    response: 'Scheduled doctor at 3:00 PM. Moved deep work to tomorrow morning. Kept team sync at 4:00.',
  },
  {
    id: 'walk',
    label: 'Add walk',
    prompt: 'Add a 30-minute walk after lunch and remind me to call mom.',
    before: [
      { time: '12:00', label: 'Lunch', color: 'amber' },
      { time: '14:00', label: 'Deep work', color: 'teal' },
    ],
    after: [
      { time: '12:00', label: 'Lunch', color: 'amber', detail: 'No change needed' },
      { time: '12:30', label: 'Walk', color: 'teal', moved: true, detail: 'Added by AI at 12:30' },
      { time: '14:00', label: 'Deep work', color: 'teal', detail: 'No change needed' },
      { time: '18:00', label: 'Call mom', color: 'amber', moved: true, detail: 'Reminder added at 18:00' },
    ],
    response: 'Added a 30-min walk at 12:30 PM. "Call mom" reminder set for 6:00 PM with a 15-min buffer.',
  },
];

const colorMap = {
  teal: { bg: 'bg-anchor-teal/15', border: 'border-anchor-teal/40', text: 'text-anchor-teal' },
  amber: { bg: 'bg-anchor-amber/15', border: 'border-anchor-amber/40', text: 'text-anchor-amber' },
  gray: { bg: 'bg-anchor-surface-light', border: 'border-anchor-border', text: 'text-anchor-text-muted' },
};

export default function FeatureAI() {
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState('idle');
  const [showAfter, setShowAfter] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const tiltRef = useTilt(0.8);
  const parallaxRef = useParallax(0.4);
  const typingTimerRef = useRef(null);

  const runScenario = useCallback((scenarioIndex) => {
    const scenario = scenarios[scenarioIndex];
    if (!scenario) return;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    setPhase('typing');
    setTypedText('');
    setShowAfter(false);
    setExpandedBlock(null);

    if (reducedMotion) {
      setTypedText(scenario.prompt);
      setPhase('done');
      setShowAfter(true);
      return;
    }

    let i = 0;
    typingTimerRef.current = setInterval(() => {
      if (i <= scenario.prompt.length) {
        setTypedText(scenario.prompt.slice(0, i));
        i++;
      } else {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        setPhase('thinking');
        setTimeout(() => {
          setPhase('done');
          setShowAfter(true);
        }, 1500);
      }
    }, 35);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(scenarios[0].prompt);
      setPhase('done');
      setShowAfter(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoPlayed) {
          setHasAutoPlayed(true);
          runScenario(0);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, hasAutoPlayed, runScenario]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const handlePresetClick = (index) => {
    setActiveScenario(index);
    runScenario(index);
  };

  const handleReplay = () => {
    runScenario(activeScenario);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;
    const lower = inputValue.toLowerCase();
    let matched = 0;
    if (lower.includes('doctor') || lower.includes('appointment')) matched = 1;
    else if (lower.includes('walk') || lower.includes('mom') || lower.includes('call')) matched = 2;
    else if (lower.includes('gym') || lower.includes('lunch') || lower.includes('morning')) matched = 0;

    setActiveScenario(matched);

    if (reducedMotion) {
      setTypedText(inputValue);
      setPhase('done');
      setShowAfter(true);
      setInputValue('');
      return;
    }

    setPhase('typing');
    setTypedText('');
    setShowAfter(false);
    setExpandedBlock(null);

    const prompt = inputValue;
    let i = 0;
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    typingTimerRef.current = setInterval(() => {
      if (i <= prompt.length) {
        setTypedText(prompt.slice(0, i));
        i++;
      } else {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        setPhase('thinking');
        setTimeout(() => {
          setPhase('done');
          setShowAfter(true);
        }, 1500);
      }
    }, 35);

    setInputValue('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  const handleBlockClick = (index) => {
    setExpandedBlock(expandedBlock === index ? null : index);
  };

  const currentScenario = scenarios[activeScenario];
  const currentTimeline = showAfter ? currentScenario.after : currentScenario.before;

  return (
    <section ref={sectionRef} id="feature-ai" className="relative py-32 overflow-hidden cyber-grid scanlines" style={{ background: 'var(--anchor-base)' }}>
      {/* Gradient orbs */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--anchor-teal-glow)' }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--anchor-orange-glow)' }}
      />
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--anchor-teal-glow)' }}
      />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <Badge color="amber" className="mb-4">AI Assistant</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
              Tell it what&apos;s going on.{' '}
              <span className="text-anchor-amber">It reorganizes the rest.</span>
            </h2>
            <p className="mt-6 text-lg text-anchor-text-muted">
              Natural language, real changes. No dragging blocks, no recalculating
              conflicts — just tell Anchor what changed and watch your day rebuild
              itself around it.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Plain English commands — no menus, no forms',
                'Context-aware: knows your budget, habits, and family',
                'Suggests optimizations you wouldn\'t think of',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-anchor-text"
                >
                  <div className="w-5 h-5 rounded-full bg-anchor-amber/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-anchor-amber" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Chat mockup + orb + timeline rearrange */}
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center transition-transform duration-300"
          >
            <Glass intensity="medium" glow glowColor="amber" className="rounded-2xl p-6 w-full max-w-md">
              <motion.div ref={tiltRef} className="flex flex-col">
              {/* Chat header with replay button */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative">
                  <div className="w-full h-full rounded-full gradient-bg animate-pulse-glow" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-anchor-text">Anchor AI</div>
                  <div className="text-xs text-anchor-text-muted">
                    {phase === 'typing' && 'Listening...'}
                    {phase === 'thinking' && 'Thinking...'}
                    {phase === 'done' && 'Done'}
                    {phase === 'idle' && 'Ready'}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleReplay}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-anchor-text-muted hover:text-anchor-amber transition-colors"
                  style={{ background: 'var(--anchor-glass-bg)', border: '1px solid var(--anchor-glass-border)' }}
                  aria-label="Replay"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>

              {/* User prompt with typing effect */}
              <div className="bg-anchor-surface rounded-xl p-3 mb-4 min-h-[60px]" data-theme="dark">
                <div className="text-xs text-gray-500 mb-1">You</div>
                <div className="text-sm text-white">
                  {typedText}
                  {phase === 'typing' && (
                    <span className="inline-block w-0.5 h-4 bg-anchor-amber ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>

              {/* AI response */}
              <AnimatePresence>
                {phase === 'done' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-anchor-amber/10 border border-anchor-amber/20 rounded-xl p-3 mb-4"
                  >
                    <div className="text-xs text-anchor-amber mb-1">Anchor AI</div>
                    <div className="text-sm text-anchor-text">
                      {currentScenario.response}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Timeline before/after */}
              <div className="space-y-2 mb-4">
                <div className="text-xs text-anchor-text-muted uppercase tracking-wider flex items-center justify-between">
                  <span>{showAfter ? 'After' : 'Before'}</span>
                  {showAfter && (
                    <span className="text-anchor-amber normal-case tracking-normal text-[10px]">Click blocks for details</span>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showAfter ? `after-${activeScenario}` : `before-${activeScenario}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1.5"
                  >
                    {currentTimeline.map((block, i) => {
                      const c = colorMap[block.color];
                      const isExpanded = expandedBlock === i;
                      const isClickable = showAfter && block.detail;
                      return (
                        <div key={i}>
                          <motion.div
                            layout
                            initial={showAfter ? { x: -20, opacity: 0 } : { x: 0, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: showAfter ? i * 0.1 : 0 }}
                            onClick={isClickable ? () => handleBlockClick(i) : undefined}
                            className={`flex items-center gap-2 rounded-lg border ${c.border} ${c.bg} px-3 py-2 ${
                              block.moved ? 'ring-1 ring-anchor-amber/30' : ''
                            } ${isClickable ? 'cursor-pointer hover:ring-1 hover:ring-anchor-teal/40 transition-all' : ''}`}
                          >
                            <div className={`text-xs font-mono ${c.text} w-12`}>{block.time}</div>
                            <div className="text-xs text-white flex-1">{block.label}</div>
                            {block.moved && (
                              <motion.span
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                className="text-xs text-anchor-amber"
                              >
                                ↻
                              </motion.span>
                            )}
                            {isClickable && (
                              <span className={`text-[10px] transition-transform ${isExpanded ? 'rotate-180' : ''} text-anchor-text-muted`}>
                                ▾
                              </span>
                            )}
                          </motion.div>
                          <AnimatePresence>
                            {isExpanded && block.detail && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="text-[11px] text-anchor-text-muted px-3 py-1.5 ml-4 border-l-2 border-anchor-amber/30">
                                  {block.detail}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Preset scenario buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {scenarios.map((scenario, i) => (
                  <motion.button
                    key={scenario.id}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handlePresetClick(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeScenario === i
                        ? 'bg-anchor-amber/20 border border-anchor-amber/40 text-anchor-amber'
                        : 'border border-anchor-border text-anchor-text-muted hover:text-anchor-text hover:border-anchor-teal/40'
                    }`}
                  >
                    {scenario.label}
                  </motion.button>
                ))}
              </div>

              {/* Interactive chat input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Tell Anchor what changed..."
                  className="flex-1 bg-anchor-surface border border-anchor-border rounded-lg px-3 py-2 text-xs text-anchor-text placeholder:text-anchor-text-muted outline-none focus:border-anchor-amber/40 transition-colors"
                  data-theme="dark"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleInputSubmit}
                  className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center text-white shrink-0"
                  aria-label="Send command"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              </motion.div>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
