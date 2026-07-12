'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
import Glass from '@/components/ui/Glass';
import { Check, Shield, Headphones, Zap, Clock } from 'lucide-react';

export default function ContactDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'dddaa146-17a7-4718-9858-9ea5579da96a',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.requirements,
          from_name: 'Anchor Landing Page',
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to send');
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    { icon: Shield, title: 'Bank-Grade Security', desc: '256-bit encryption for all your data' },
    { icon: Headphones, title: '24/7 AI Support', desc: 'Your assistant never sleeps' },
    { icon: Zap, title: 'Instant Sync', desc: 'Real-time updates across all devices' },
    { icon: Clock, title: 'Smart Scheduling', desc: 'AI that learns your patterns' },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Breathing glow background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(30, 187, 212, 0.1) 0%, rgba(248, 156, 17, 0.08) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-anchor-text tracking-tight mb-6">
              Drop anchor.{' '}
              <span className="gradient-text">Everything else can wait.</span>
            </h2>
            <p className="text-lg text-anchor-text-muted mb-8">
              Stop juggling apps. Start living intentionally. One intelligent system that syncs your schedule, budget, habits, and family — all powered by AI that actually learns your patterns.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-anchor-teal/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-anchor-teal" />
                    </div>
                    <div>
                      <div className="font-semibold text-anchor-text">{benefit.title}</div>
                      <div className="text-sm text-anchor-text-muted">{benefit.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-sm text-anchor-text-muted">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-anchor-teal to-anchor-orange border-2 border-anchor-base"
                  />
                ))}
              </div>
              <span>Trusted by 500+ teams worldwide</span>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Glass intensity="medium" className="rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-anchor-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-anchor-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-anchor-text mb-2">Request Received!</h3>
                  <p className="text-anchor-text-muted">
                    We'll be in touch within 24 hours to schedule your free demo.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-anchor-text mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-anchor-surface border border-anchor-border text-anchor-text placeholder:text-anchor-text-muted/50 focus:outline-none focus:border-anchor-teal focus:ring-1 focus:ring-anchor-teal transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-anchor-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-anchor-surface border border-anchor-border text-anchor-text placeholder:text-anchor-text-muted/50 focus:outline-none focus:border-anchor-teal focus:ring-1 focus:ring-anchor-teal transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-anchor-text mb-2">
                      What's pulling your day apart right now?
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-anchor-surface border border-anchor-border text-anchor-text placeholder:text-anchor-text-muted/50 focus:outline-none focus:border-anchor-teal focus:ring-1 focus:ring-anchor-teal transition-all resize-none"
                      placeholder="Tell us what's challenging about your daily routine..."
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Start Free'}
                  </Button>

                  <p className="text-xs text-anchor-text-muted text-center">
                    No credit card required. Start your journey today.
                  </p>
                </form>
              )}
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
