/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      blue: colors.blue,
      green: colors.green,
      gray: colors.gray,
      yellow: colors.yellow,
      red: colors.red,
      black: colors.black,
      sky: "#3ce8e8",
    },
    extend: {},
  },
  plugins: [],
};
