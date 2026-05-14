/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: {
          DEFAULT: '#f4efeb',
          dark: '#e0d9cc',
          border: '#dcd3c6',
        },
        ink: {
          DEFAULT: '#2c2825',
          faded: '#8c8177',
          dark: '#1a1715',
        },
        accent: {
          red: '#b84a39',
          error: '#d44d4d',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
        mincho: ['Shippori Mincho', 'serif'],
      },
      letterSpacing: {
        'jp-wide': '0.4em',
        'jp-normal': '0.1em',
        'jp-tight': '0.05em',
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
          '0%, 15%, 80%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.05)', pointerEvents: 'none' },
        },
        'splash-text-anim': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '25%, 75%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(1.1)' },
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
