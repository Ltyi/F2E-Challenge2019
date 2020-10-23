module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.vue'],
  theme: {
    fontFamily: {
      base: ['Roboto', 'sans-serif'],
      noto: ['Noto Sans TC', 'sans-serif']
    },
    colors: {
      white: '#ffffff',
      gray: {
        100: '#f9f9f9',
        200: '#e3e3e3',
        300: '#969696',
        400: '#949494',
        500: '#717171',
        600: '#4a4a4a'
      },
      red: {
        100: '#ffeded',
        200: '#ffe9e9',
        300: '#ffcdcd',
        400: '#fe8d8d',
        500: '#ff7575',
        600: '#ff6d6d',
        700: '#f85a5a',
        800: '#e54343',
        900: '#dc3535',
        1000: '#cb2424',
        1100: '#ba2323',
        1200: '#ff0000'
      },
      green: {
        100: '#e6fdf8',
        200: '#e0fffb',
        300: '#ccfff4',
        400: '#abf0e1',
        500: '#95e2d6',
        600: '#50e3c2',
        700: '#35fbd5',
        800: '#5bd2c1',
        900: '#4eb6a8',
        1000: '#06bca4',
        1100: '#04baa2'
      }
    },
    extend: {
      fontSize: {
        100: '100px'
      },
      borderWidth: {
        3: '3px'
      }
    }
  },
  variants: {},
  plugins: []
}
