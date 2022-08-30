/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "components/**/*.{vue,js}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "storm-dark": "#2E333F",
        "storm-darkblue": "#384661",
        "storm-blue": "#3B517F",
        "storm-purple": "#2E333F",
        "storm-grad-left": "#00DDFF",
        "storm-grad-right": "#FF00D4",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
};
