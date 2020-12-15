// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#222222',
      white: '#fcfcfc',
      yellow: '#ffb53e',
      gray: '#e2e2e2'
    },
    extend: {
      width: {
        card: '95px',
        king: '60px'
      },
      height: {
        card: '143px'
      },
      borderWidth: {
        card: '0.5px'
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
      backgroundSize: {
        35: '35px'
      },
      backgroundImage: () => ({
        C: 'url("~@/assets/cardsBG/C.png")',
        D: 'url("~@/assets/cardsBG/D.png")',
        H: 'url("~@/assets/cardsBG/H.png")',
        S: 'url("~@/assets/cardsBG/S.png")'
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
