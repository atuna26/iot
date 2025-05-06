/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#5D4037", // Deep Warm Brown (for dark backgrounds)
      secondary: "#4E342E", // Dark Chocolate Brown (for contrast)
      accent: "#D7A46A", // Soft Pastel Caramel (for buttons, highlights)
        background: "#F3F4F6", // Light Grayish White (for sections)
        gray: "#ECECEC", // Neutral Gray (for text, borders)
        white: "#F9FAFB", // Off-white (for clean design)
        success: "#22C55E", // Green (for success messages)
        warning: "#EAB308", // Yellow (for warnings)
        error: "#a62800", // Red (for error states)
        info: "#60A5FA", // Light Blue (for informational alerts)
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        abel:["Abel", "sans-serif"],
      },
      boxShadow: {
        'glow': "0px 0px 70px 10px rgba(30,59,138,0.9)",
        'glow-soft': "0px 0px 15px 2px rgba(30,59,138,0.5)",
        'glow-inset': "inset 0px 0px 15px 2px rgba(30,59,138,0.2)",

      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}