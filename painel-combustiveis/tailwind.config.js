/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Padrão Digital de Governo
        'gov-blue': {
          DEFAULT: '#1351B4',
          'warm': '#155BCB',
          'cool': '#0C326F',
          'light': '#1B4B99',
        },
        'gov-gray': {
          2: '#333333',
          8: '#555555',
          20: '#CCCCCC',
          80: '#F8F8F8',
        },
        'gov-green': {
          DEFAULT: '#168821',
          'cool': '#0D7C2D',
        },
        'gov-yellow': {
          DEFAULT: '#FFCD07',
        },
      },
      fontFamily: {
        'rawline': ['Rawline', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.2' }],
        'h1': ['2.5rem', { lineHeight: '1.3' }],
        'h2': ['2rem', { lineHeight: '1.3' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
