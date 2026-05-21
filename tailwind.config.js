/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: '#0a0818',
        'dark-2': '#110d2a',
      },
      animation: {
        'beat':      'beat 1.3s ease-in-out infinite',
        'float':     'float 6s ease-in-out infinite',
        'glow':      'glow 2s ease-in-out infinite',
        'gradient':  'gradientBG 12s ease infinite',
        'fadeIn':    'fadeIn 1s ease forwards',
        'slideUp':   'slideUp 0.8s ease forwards',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%':       { transform: 'scale(1.2)' },
          '28%':       { transform: 'scale(1)' },
          '42%':       { transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(236,72,153,0.3)' },
          '50%':       { boxShadow: '0 0 50px rgba(236,72,153,0.7), 0 0 90px rgba(124,58,237,0.4)' },
        },
        gradientBG: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
