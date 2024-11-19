/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Manrope", "sans-serif"],
        display: ["Anton", "sans-serif"],
      },
    },
  },
  plugins: [],
};
