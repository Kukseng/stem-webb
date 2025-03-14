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
        Descride: "16px",
        xs: ".75rem",// 12px / 16px = .75rem
        sm: "1.125rem", // 18px / 16px = 1.125rem
        base: "1.375rem", // 22px / 16px = 1.375rem
        lg: "1.625rem", // 26px / 16px = 1.625rem
        xl: "1.75rem", // 28px / 16px = 1.75rem
        "2xl": "1.875rem", // 30px / 16px = 1.875rem

        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      colors: {
        primary: " #16789e",
        secondary: "#FFFF8F",
        accent: "#F59E0B",
        descrid: "#384D6C",
        hover: "#1e8fb8",
        border: "#3A454D",
        card: "#E1E1E1",
        footer: "#79D4F7",
      },
      maxWidth: {
        content: "1300px",
        // contentlg:"900px",
        // contentmd:"700px",
        // contentsm:"200px",
        // content2xl:"1700px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
