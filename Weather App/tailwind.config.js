/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'weather': "url('src/assets/bg.jpg')",
        'location': "url('src/assets/location.jpg')"
      }
    },
  },
  plugins: [],
}