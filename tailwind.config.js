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
        'customYellow': '#f9e900ff'
      },
      width: {
        '50px': '50px',
      },
      padding: {
        '3px': '3px',
      },
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
