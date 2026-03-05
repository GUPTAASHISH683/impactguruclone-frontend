/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5722',
          'orange-dk': '#E64A19',
          teal: '#00897B',
          'teal-lt': '#26A69A',
          dark: '#1A1A2E',
          dark2: '#16213E',
          navy: '#0F3460',
          cream: '#FFF8F0',
        }
      },
      fontFamily: {
        display: ['"Roboto"', 'Georgia', 'serif'],
        body: ['"Roboto"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatUp 5s ease-in-out infinite',
        'float-delay': 'floatUp 5s ease-in-out infinite 2.5s',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'pulse-dot': 'pulseDot 2s infinite',
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
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #16213E 45%, #0F3460 100%)',
        'cta-gradient':  'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      }
    },
  },
  plugins: [],
}
