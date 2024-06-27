/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        arabic: ['arabic']
      },
      colors: {
        'font-gray': '#9C9C9C',
        'tag-color': '#066651',
        'tag-color-two': '#FF912C'

      },
      backgroundColor: {
        'tag-color': 'rgba(6, 102, 81, 0.15)',
        'tag-color-two': 'rgba(255, 196, 142, 0.25)',
        'dark-green': '#066651'
      }
    },
  },
  plugins: [],
};
