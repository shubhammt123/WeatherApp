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
        'haze': "url('src/assets/location.jpg')",
        'cloud' : "url('src/assets/cloud.jpg')",
        'thunderstorm' : "url('src/assets/thunderstrom.jpg')",
        'drizzle' : "url('src/assets/drizzle.jpg')",
        'rain' : "url('src/assets/rain.jpg')",
        'snow' : "url('src/assets/snow.jpg')",
        'clear' : "url('src/assets/location.jpg')"
      }
    },
  },
  plugins: [],
}
