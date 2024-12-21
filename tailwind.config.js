/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgprimary: "#343436",
        navbgprimary: "#2B2A2C",
        "primary-color": "#F2E7D4",
        "secondary-text-color": "#7A766E",
        "nav-primary-color": "#2B2A2C",
      },
      fontFamily: {
        fontprimary: ["Cairo-regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
