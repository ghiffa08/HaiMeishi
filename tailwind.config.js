/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#fef9f1',
        'on-surface': '#1d1c17',
        'on-surface-variant': '#4c463f',
        'washi-paper': '#F5F0E8',
        'sumi-ink': '#1A1510',
        'hanko-red': '#C0392B',
        'circuit-blue': '#1A62D4',
        'ancient-tan': '#9A8D7A',
        washi: {
          DEFAULT: '#F5F0E8',
          dark: '#E7E2DA',
          border: '#9A8D7A',
        },
        ink: {
          DEFAULT: '#1A1510',
          faded: '#7E766E',
          dark: '#120F0C',
        },
        accent: {
          red: '#C0392B',
          blue: '#1A62D4',
          error: '#BA1A1A',
        }
      },
      fontFamily: {
        serif: ['EB Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
        mincho: ['Shippori Mincho', 'serif'],
      },
      letterSpacing: {
        'jp-wide': '0.4em',
        'jp-normal': '0.1em',
        'jp-tight': '0.05em',
      },
      spacing: {
        'gutter': '24px',
        'margin-page': '40px',
        'grid-unit': '80px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px'
      },
      fontSize: {
        'headline-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'accent-italic': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'data-label': ['14px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '500' }],
        'data-value': ['14px', { lineHeight: '1.2', fontWeight: '400' }]
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'hanko-stamp': 'hanko-stamp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'splash-bg': 'splash-bg-fade 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'splash-text': 'splash-text-anim 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'splash-bg-fade': {
          '0%, 80%': { opacity: '1' },
          '100%': { opacity: '0', pointerEvents: 'none' },
        },
        'splash-text-anim': {
          '0%': { opacity: '0' },
          '30%, 70%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'hanko-stamp': {
          '0%': { transform: 'rotate(-45deg) scale(5)', opacity: '0' },
          '100%': { transform: 'rotate(-15deg) scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
