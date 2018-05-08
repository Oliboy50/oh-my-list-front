const pkg = require('./package');
const env = require('./env');

const API_BASE_URL = process.env.API_BASE_URL || env.API_BASE_URL;

module.exports = {
  mode: 'universal',

  env: {
    API_BASE_URL: API_BASE_URL,
    HTTPS_ENABLED: process.env.HTTPS_ENABLED || env.HTTPS_ENABLED,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/buefy.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/setup-token' },
    { src: '~/plugins/axios' },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['nuxt-buefy', {css: false, materialDesignIcons: false}],
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://axios.nuxtjs.org/options.html
    baseURL: API_BASE_URL,
    credentials: false,
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false,
          },
        },
      },
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // dirty fix for "This dependency was not found: * fs in ./node_modules/winston/lib/winston/common.js, ./node_modules/winston/lib/winston/transports/file.js"
      config.node = {
        ...config.node,
        fs: 'empty',
      };

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
