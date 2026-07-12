'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== 'undefined' ? localStorage.getItem('anchor-theme') : null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  const setThemeMode = (mode) => {
    setTheme(mode);
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('anchor-theme', mode);
    setIsOpen(false);
  };

  const setSystemTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setThemeMode(systemTheme);
    localStorage.removeItem('anchor-theme');
  };

  return (
    <div className={`relative ${className}`}>
      {/* System button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-neon transition-colors hover:scale-105"
        aria-label="Theme options"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-anchor-teal">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span className="text-sm text-anchor-text-muted">System</span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-40 glass rounded-xl overflow-hidden z-50"
          >
            <button
              onClick={() => setThemeMode('light')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-anchor-text-muted hover:text-anchor-text hover:bg-anchor-border/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-anchor-amber">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Light Mode
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-anchor-text-muted hover:text-anchor-text hover:bg-anchor-border/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-anchor-text-muted">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Dark Mode
            </button>
            <button
              onClick={setSystemTheme}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-anchor-text-muted hover:text-anchor-text hover:bg-anchor-border/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-anchor-teal">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
