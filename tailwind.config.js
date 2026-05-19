/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        paper: "#f7f1e1",
        amber: "#d39d55",
        maroon: "#7f1d1d",
        brass: "#cda15d",
        slateLine: "#334155",
        moss: "#2f4f4f",
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 18px 50px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
