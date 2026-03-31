export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'term-bg': '#0C0C0C',
        'term-text': '#CCCCCC',
        'term-green': '#00FF41',
        'term-yellow': '#FFFF00',
        'term-cyan': '#00FFFF',
        'term-purple': '#c678dd',
        'term-red': '#E06C75',
        'term-blue': '#61AFEF',
        'term-gray': '#5C6370',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
