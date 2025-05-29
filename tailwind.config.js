/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#e0f7fa",        // azul cielo muy claro
          card: "#ffffff",      // blanco puro
          text: "#0d47a1",      // azul profundo
          accent: "#039be5",    // azul vibrante
          secondary: "#00796b", // verde azulado fuerte
        },
        dark: {
          bg: "#0d1b2a",        // azul muy oscuro (casi negro)
          card: "#1b263b",      // azul oscuro
          text: "#f1f5f9",      // gris casi blanco
          accent: "#00bcd4",    // celeste vibrante
          secondary: "#90caf9", // azul claro pastel
        },
      },
      boxShadow: {
        glass: "0 8px 24px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "2px",
          medium: "4px",
          large: "6px",
        },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        light: {},
        dark: {},
      },
    }),
  ],
};
