module.exports = {
 mode: "jit",
 purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
 darkMode: false, // or 'media' or 'class'
 theme: {
  extend: {},
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
