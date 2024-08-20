/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        kaushan: ["Kaushan Script"],
        overpass: ["overpass"]
      },
      colors: {
        primary: "#003A37",
        colorMenu: "#569390",
        cancelar: "#725B5B",
        secondary: "#0ea5e9"
      }
    },
  },
  plugins: [],
}

