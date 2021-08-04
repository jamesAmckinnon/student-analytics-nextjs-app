module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'customBlue': '#00c3f4ff',
        'customYellow': '#f9e900ff',
        'customBlue2': '#0981f2ff',
        'customGreen': '#32a854ff',
        'customGrey': '#d0d0d0ff',
      },
      width: {
        '50px': '50px',
        '130px': '130px',
        '35px':'35px',
        '90px':'90px',
        '200px': '200px',
      },
      height: {
        '24px' : '24px',
        '80px' : '80px'
      },
      padding: {
        '3px': '3px',
        '16px': '16px'
      },
      margin: {
        
      }
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
            })
  },
  variants: {},
  plugins: [],
}
