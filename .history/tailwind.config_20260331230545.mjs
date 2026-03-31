/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        term: {
          bg: '#0C0C0C',
          text: '#CCCCCC',
          green: '#00FF41',
          yellow: '#FFFF00',
          cyan: '#00FFFF',
          purple: '#c678dd',
          red: '#E06C75',
          blue: '#61AFEF',
          gray: '#5C6370'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
