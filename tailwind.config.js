/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        anchor: {
          amber: '#f89c11',
          teal: '#1ebbd4',
          'amber-dark': '#d4880e',
          'teal-dark': '#199db3',
          'base': 'var(--anchor-base)',
          'surface': 'var(--anchor-surface)',
          'surface-light': 'var(--anchor-surface-light)',
          'border': 'var(--anchor-border)',
          'text': 'var(--anchor-text)',
          'text-muted': 'var(--anchor-text-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'idle-rotate': 'idle-rotate 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'drift': 'drift 30s ease-in-out infinite',
        'orbit-spin-slow': 'orbit-spin 35s linear infinite',
        'orbit-spin-medium': 'orbit-spin 25s linear infinite',
        'orbit-spin-fast': 'orbit-spin 15s linear infinite',
        'pulse-scale': 'pulse-scale 4s ease-in-out infinite',
      },
      keyframes: {
        'idle-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        'orbit-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
