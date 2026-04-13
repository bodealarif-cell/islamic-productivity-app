/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#0F172A',
        accent: '#14B8A6',
        background: '#020617',
        card: '#111827',
        textPrimary: '#E2E8F0',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.4s ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)', opacity: '1' },
          '50%': { transform: 'rotateX(90deg)', opacity: '0.5' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
