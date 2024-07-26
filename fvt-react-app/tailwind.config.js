/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        fvtLavender: {
          100: '#D1D8F7',
          200: '#4755A8',
          300: '#A882DD',
        },
        fvtGrey: '#E0E0E0',
      }
    },
  },
  plugins: [],
}

