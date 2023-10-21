const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
      // default screens:
      // sm: '640px',
      // md: '768px',
      // lg: '1024px',
      // xl: '1280px',
      // '2xl': '1536px',
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8eb44f",
  
          secondary: "#daaf53",
  
          accent: "#ed6160",
  
          neutral: "#304922",
  
          "base-100": "#f6efdd",
  
          info: "#0891b2",
  
          success: "#059669",
  
          warning: "#d97706",
  
          error: "#b91c1c",
        },
      }
    ]
  }
};
