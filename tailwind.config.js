import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.slate,
    },
  },
};
