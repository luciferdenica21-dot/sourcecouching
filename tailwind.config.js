/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-lime': '#E2F91C',
        'brand-green': '#9BCE12',
        'brand-dark': '#101710',
        'brand-brown': '#715549',
        'brand-beige': '#A89E91',
        'brand-magenta': '#D1305C',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
