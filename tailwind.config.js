/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "30px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,.06)"
      },
      colors: {
        bg: "#F8F8F8",
        ink: "#222222",
        ink2: "#777777",
        purple: "#B97EFF",
        orange: "#FFA949"
      }
    },
  },
  plugins: [],
};
