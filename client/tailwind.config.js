/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ['./src/**/**/*.{html,js}',
'./src/Components/pages/team.js',"./src/**/*.{html,js}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'pinkcustom': '#c0b7dc',
      'lightfont':'rgb(252, 253, 256)',
      'darkbg':'#27293F;'
    },
    extend: {},
  },
  width: {
    '2/15':'13.3%'
  },
  plugins: [
  ],
}

