/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgprimary: "#343436",
        "primary-color": "#F2E7D4",
      },
      fontFamily: {
        fontprimary: ["Cairo-regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
