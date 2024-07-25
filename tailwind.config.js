/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#119F97",
        primaryText: "#000000CC",
        red: {
          100: "#FF5D391F",
          900: "#FF5D39",
        },
        gray: {
          100: "#0000000A",
          800: "#00000080",
        },
      },
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
