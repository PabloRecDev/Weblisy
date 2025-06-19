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
          DEFAULT: '#6b7280',
          light: '#9ca3af',
          dark: '#4b5563',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CCCCCC',
        },
        customOrange: '#db4a2b',
        customBlack: '#09090b',
      },
      borderColor: {
        DEFAULT: '#666666',
      }
    },
  },
  plugins: [],
} 