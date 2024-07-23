/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#119F97",
        darkGray: "#00000080",
        primaryText: "#000000CC",
      },
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
