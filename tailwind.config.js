/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B3B3B',
          20: '#333333',
          40: '#666666',
          60: '#999999',
          80: '#CCCCCC',
          100: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFBD59',
          light: '#FFD699',
          dark: '#CC973A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CCCCCC',
        }
      },
      borderColor: {
        DEFAULT: '#666666',
      }
    },
  },
  plugins: [],
} 