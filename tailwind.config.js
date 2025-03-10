import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        suwannaphum: ["Suwannaphum", "serif"],
      },
      fontSize: {
        Descride:"16px",
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      colors: {
        primary: "#16789e",
        secondary: "#FFFF8F",
        accent: "#F59E0B",
        descrid:"#384D6C",
        hover:"#1e8fb8",
        border:"#3A454D",
        card:"#E1E1E1",
        footer:"#79D4F7"
      },
      maxWidth: {
        content: "1300px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
