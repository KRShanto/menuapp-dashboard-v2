/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgprimary: "#343436",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "10px",
          sm: "1.5rem",
          lg: "2rem",
          xl: "4rem",
        },
      },
    },
  },
  plugins: [],
};
