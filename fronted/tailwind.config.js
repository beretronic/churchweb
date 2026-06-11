/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slc: {
          blue:      '#1e3a8a',
          blueDark:  '#0f172a',
          blueLight: '#3b82f6',
          gold:      '#d97706',
          goldHover: '#b45309',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
