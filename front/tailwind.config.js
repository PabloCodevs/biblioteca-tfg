/** @type {import('tailwindcss').Config} */
import * as tailwindprimeui from 'tailwindcss-primeui'
export default {
  darkMode: ['selector', '[class*="app-dark"]'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'formkit.theme.ts'],
  plugins: [tailwindprimeui],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px',
    },
  },
}
