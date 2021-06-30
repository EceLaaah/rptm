module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth : {
        "content" : "1200px"
      },
      colors: {
        "primary": "#001E3A",
        "primary-slight": "rgba(0, 30, 58, 0.8)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
