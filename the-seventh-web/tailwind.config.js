/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        blood: {
          50:  '#fef2f2',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          900: '#450a0a',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        ink: {
          950: '#030712',
          900: '#111827',
          800: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};