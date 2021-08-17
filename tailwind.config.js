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
        'selectGrey': '#ddddddff',
        'customRed': '#ff0000ff',
        'bgBlue': '#c9f3ffff',
        'customOrange' : '#ff892bff',
      },
      width: {
        '50px': '50px',
        '130px': '130px',
        '35px':'35px',
        '90px':'90px',
        '107px':'107px',
        '170px':'170px',
        '200px': '200px',
        '210px':'210px',
        '230px': '230px',
      },
      height: {
        '24px' : '24px',
        '80px' : '80px',
        '36px' : '36px',
      },
      padding: {
        '2px':'2px',
        '3px': '3px',
        '4px':'4px',
        '5px':'5px',
        '16px': '16px',
        '54px': '54px'
      },
      margin: {
        '2px': '2px',
        '22px': '22px',
        '1px':'1px',
      },
      backgroundImage: theme => ({
        'arrow': "url('public/arrow.svg')"
      })
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
