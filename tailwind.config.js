/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          primary: '#222326',
          secondary: '#303136',
          shadow: '#17181A',
        },
        champagne: '#C9A96E',
        ivory: '#F3EBDD',
        deepred: '#8F1719',
        cream: {
          50: '#FDFBF7',
          100: '#F3EBDD',
          200: '#E5DAC6',
          300: '#D4C3A3',
        },
        gold: {
          100: '#F3EBDD',
          200: '#DFC79A',
          300: '#C9A96E',
          400: '#B49155',
          500: '#9A783E',
          600: '#7D5F2D',
        },
        noir: {
          950: '#17181A',
          900: '#222326',
          800: '#303136',
          700: '#3E4047',
          600: '#5A5D66',
          500: '#858994',
        },
        crimson: {
          700: '#8F1719',
          800: '#6B1012',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
