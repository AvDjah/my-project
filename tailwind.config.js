module.exports = {
 mode: "jit",
 purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
 darkMode: false, // or 'media' or 'class'
 theme: {
  extend: {
   gridTemplateRows: {
    layout: "repeat(10,288px)",
   },
   gridAutoRows: {
    try: "288px",
   },
  },
  minWidth: {
   0: "0",
   "1/2": "35%",
  },
 },
 variants: {
  extend: {},
 },
 plugins: [],
};
