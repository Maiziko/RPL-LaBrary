import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        primary: "#42898C",
        background : "#E0E0E0",
        disabled: "#D9D9D9",
        "soft-green" : '#C6E7ED',
        "strong-orange" : '#C86F43',
        "brown-yellow" : '#FBF3CC',
        "gray-green" : '#C5D0D2',
        "yel-bro" : '#FBF3CC',
        "strong-bro":'#C86F43',
      },
      minHeight: {
        'screen': '300px', // Mengatur 'min-h-screen' menjadi tinggi viewport
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },

    },
  },
  plugins: [],
}



export default config
