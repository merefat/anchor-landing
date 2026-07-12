'use client';

import { motion } from 'motion/react';

export default function StepControls({ currentStep, totalSteps, onStepChange, isMobile = false }) {
  const steps = ['Connect', 'Sync', 'Budget'];

  return (
    <div className="flex gap-2 mt-4">
      {steps.map((step, index) => (
        <motion.button
          key={index}
          onClick={() => onStepChange(index)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStepChange(index);
            }
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            currentStep === index 
              ? 'ring-2 ring-offset-2 ring-offset-[#1a1a2e]' 
              : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            background: currentStep === index ? 'var(--anchor-purple)' : 'rgba(124, 58, 237, 0.2)',
            color: 'white',
            ringColor: 'var(--anchor-purple)'
          }}
          aria-label={`Go to ${step} step`}
          aria-current={currentStep === index ? 'step' : undefined}
          tabIndex={0}
        >
          {step}
        </motion.button>
      ))}
    </div>
  );
}
