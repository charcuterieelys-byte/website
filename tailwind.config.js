/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF3E3',
          200: '#F2E7CE',
          300: '#E5D4B1',
        },
        gold: {
          100: '#F9E8C2',
          200: '#F3D18D',
          300: '#DFB96E',
          400: '#C59B4E',
          500: '#AD8337',
          600: '#8F6A26',
        },
        noir: {
          950: '#0D0A0B',
          900: '#141111',
          800: '#211C1D',
          700: '#383031',
          600: '#544A4B',
          500: '#736869',
        },
        crimson: {
          700: '#990000',
          800: '#730000',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 12px 40px -12px rgba(20, 17, 17, 0.08)',
        'luxury': '0 20px 50px -15px rgba(20, 17, 17, 0.14)',
        'gold-glow': '0 8px 25px -4px rgba(197, 155, 78, 0.28)',
      }
    },
  },
  plugins: [],
}
