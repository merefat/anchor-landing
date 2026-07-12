'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Glass from '@/components/ui/Glass';

const faqs = [
  {
    q: 'Is my bank data secure?',
    a: 'Yes. All bank connections use 256-bit bank-grade encryption in transit and at rest. We never store your banking credentials — connections are handled through certified third-party providers (like Plaid) that use tokenized access. You can disconnect any linked account at any time, and your transaction data is deleted within 30 days.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your data is yours. If you cancel Premium, you keep access to your timeline, habits, and budget history on the Free plan. If you want a full account deletion, we remove all personal data within 30 days of your request — no retention beyond what\'s legally required.',
  },
  {
    q: 'How does family pricing work?',
    a: 'The first member is always free on the Free plan. On Premium, the base price covers one person, and each additional family member is $10/month. Use the stepper on the pricing section above to see your exact monthly total. You can add or remove members anytime — billing prorates automatically.',
  },
  {
    q: 'Can I use Anchor without linking a bank account?',
    a: 'Absolutely. Anchor works fully as a planner and habit tracker without any bank connection. You can manually enter expenses or skip the budget feature entirely. Bank linking is opt-in and only enhances the experience by auto-categorizing transactions onto your timeline.',
  },
  {
    q: 'What platforms is Anchor available on?',
    a: 'Anchor is available on iOS and Android as a native mobile app, and on the web at anchor.app. All three sync in real time, so you can plan on desktop in the morning and check your timeline on your phone throughout the day.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-3xl mx-auto section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-anchor-text tracking-tight">
            Questions, <span className="gradient-text">answered.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="rounded-xl overflow-hidden"
            >
              <Glass intensity="low" className="rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-medium text-anchor-text">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 ml-4"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="var(--anchor-text-muted)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-anchor-text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              </Glass>
            </motion.div>
          ))}
        </div>

        {/* Contact prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-anchor-text-muted">
            Still have questions?{' '}
            <a href="#" className="text-anchor-teal hover:text-anchor-teal-dark transition-colors">
              Get in touch →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
