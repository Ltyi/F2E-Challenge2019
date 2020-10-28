const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
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
        base: '#ff0000',
        100: 'rgba(255,124,124,0.15)',
        200: 'rgba(234,14,14,0.45)',
        300: '#ff7575',
        400: '#ff6d6d',
        500: '#f85a5a',
        600: '#e54343',
        700: '#dc3535',
        800: '#cb2424',
        900: '#ba2323'
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
      width: {
        21: '5.25rem'
      },
      height: {
        21: '5.25rem'
      },
      padding: {
        21: '5.25rem'
      },
      fontSize: {
        100: '100px'
      },
      borderWidth: {
        3: '3px'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.back-hidden': {
          'backface-visibility': 'hidden'
        },
        '.wtiting-v-rl': {
          'writing-mode': 'vertical-rl'
        }
      }

      addUtilities(newUtilities)
    })
  ]
}
