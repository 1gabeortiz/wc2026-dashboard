import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: '#0B0F1A',
        surface: '#141824',
        border: '#222840',
        gold: '#C8A84B',
        live: '#E84545',
        text: {
          primary: '#F0F0F0',
          secondary: '#8A92A8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulseLive: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.9)' },
        },
      },
      animation: {
        'pulse-live': 'pulseLive 1.2s ease-in-out infinite',
      },
      maxWidth: {
        content: '1720px',
      },
      screens: {
        '3xl': '1760px',
      },
    },
  },
  plugins: [],
} satisfies Config;
