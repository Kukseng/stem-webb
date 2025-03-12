import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        suwannaphum: ["Kantumruy Pro", "sans-serif"],
      },
      fontSize: {
        Descride:"16px",
        xs: ".75rem",
        sm: "22px",
        base: "26px",
        lg: "30px",
        xl: "34px",
        "2xl": "38px",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      colors: {
       primary:" #16789e",
        secondary: "#FFFF8F",
        accent: "#F59E0B",
        descrid:"#384D6C",
        hover:"#1e8fb8",
        border:"#3A454D",
        card:"#E1E1E1",
        footer:"#79D4F7"
      },
      maxWidth: {
        content: "1400px",
        contentlg:"900px",
        contentmd:"700px",
        contentsm:"200px",
        content2xl:"1700px",
      },

    },
  },
  plugins: [flowbite.plugin()],
};
