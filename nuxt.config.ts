export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  alias: {
    '~/*': './*',
  },
  components: [
    { path: '~/components/atoms' },
    { path: '~/components/molecules' },
  ],
  srcDir: './',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
