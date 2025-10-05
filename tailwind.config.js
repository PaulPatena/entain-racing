// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-soft': 'var(--color-primary-soft)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',

        // add this:
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
}
