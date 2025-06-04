/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff0000',       // Red
        secondary: '#1a1a1a',     // Black
        darkBg: '#000000',        // Pure black for background
        lightBg: '#f8f8f8',
        darkText: '#f8f8f8',
        lightText: '#121212',
        glassBg: 'rgba(255, 0, 0, 0.1)',
        pureBlack: '#121212',     // Dark gray for elements
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [],
}

