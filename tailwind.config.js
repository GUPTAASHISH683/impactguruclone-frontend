/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary brand green (#1B9B6C) — used for buttons, links, highlights
          primary:    '#1B9B6C',
          'primary-dk': '#157A54',
          // Secondary greens
          teal:       '#0F6C4F',
          'teal-lt':  '#34B27B',
          // Neutrals
          dark:       '#0F1411',
          dark2:      '#141B16',
          navy:       '#1B2A23',
          cream:      '#F5FBF7',
        },
        // Green-tinted palette that maps to Funddoo brand shades
        // Used via Tailwind utilities like bg-green-50, border-green-200 etc.
        green: {
          50:  '#F2FBF7',
          100: '#E3F6EE',
          200: '#BFEAD8',
          300: '#94DDBF',
          400: '#5CC7A0',
          500: '#1B9B6C',
          600: '#167F57',
          700: '#126545',
          800: '#0F5038',
          900: '#0C3E2C',
        },
      },
      fontFamily: {
        display: ['"Roboto"', 'Georgia', 'serif'],
        body:    ['"Roboto"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow':  'floatUp 5s ease-in-out infinite',
        'float-delay': 'floatUp 5s ease-in-out infinite 2.5s',
        'fade-up':     'fadeUp 0.6s ease forwards',
        'slide-in':    'slideIn 0.3s ease forwards',
        'pulse-dot':   'pulseDot 2s infinite',
      },
      keyframes: {
        floatUp: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateY(10px) scale(.97)' },
          to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        pulseDot: {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.5 },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F1411 0%, #16261D 45%, #1B3A2B 100%)',
        'cta-gradient':  'linear-gradient(135deg, #0F1411 0%, #16261D 100%)',
      },
    },
  },
  plugins: [],
}
