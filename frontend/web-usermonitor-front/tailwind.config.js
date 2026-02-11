/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
       colors: {
        "primary": "#13ec5b",
        "background-dark": "#020617",
        "card-dark": "#1e293b",
        "border-dark": "#334155",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "mono": ["Fira Code", "monospace"]
      }
    },
  },
  plugins: [],
}

