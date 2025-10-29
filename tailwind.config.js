/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontSize: {
        'section-title': '32px',
        'body': '18px',
        'small': '14px',
      },
      colors: {
        'text-primary': '#1a1a1a', // Near-black for light mode (90% black)
        'text-secondary': '#4a4a4a', // Dark gray for light mode (70% black)
        'text-muted': '#6b6b6b', // Medium gray for light mode (58% black)
      },
    },
  },
  plugins: [],
}

