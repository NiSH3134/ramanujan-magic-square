module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        accent: 'var(--color-accent)',
      },
      boxShadow: {
        default: 'var(--shadow)',
      },
    },
  },
  darkMode: 'class', // ensures .dark class works
  plugins: [require('tailwind-scrollbar')],
};