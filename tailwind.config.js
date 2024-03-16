/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // body: ["Ubuntu Mono", "sans-serif"],
        'sans': ['"Ubuntu Mono"', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        primary: "#111",
        secondary: "#222"
      }
    },
  },
  
  plugins: [],
}

