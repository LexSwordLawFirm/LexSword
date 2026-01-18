/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        law: {
          gold: '#c5a059',
          navy: '#0f172a',
          dark: '#020617'
        }
      }
    },
  },
  plugins: [],
}
