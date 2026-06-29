/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff477e',
          glow: 'rgba(255, 71, 126, 0.4)',
        },
        secondary: '#ff85a2',
        accent: '#ff0a54',
      }
    },
  },
  plugins: [],
}
