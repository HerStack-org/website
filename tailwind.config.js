/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        purple: {
          DEFAULT: '#7B5CF0',
          light: '#EEEDFE',
          mid: '#A78BFA',
          dark: '#6344d4',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: 'var(--ink-muted)',
        },
        cream: {
          DEFAULT: 'var(--cream)',
          dark: 'var(--cream-dark)',
        },
      },
    },
  },
  plugins: [],
}
