export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'term-bg': 'var(--term-bg)',
        'term-text': 'var(--term-text)',
        'term-green': 'var(--term-green)',
        'term-yellow': 'var(--term-yellow)',
        'term-cyan': 'var(--term-cyan)',
        'term-purple': 'var(--term-purple)',
        'term-red': 'var(--term-red)',
        'term-blue': 'var(--term-blue)',
        'term-gray': 'var(--term-gray)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}