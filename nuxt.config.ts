// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
    "@vueuse/nuxt",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode"
  ],
  devtools: { enabled: true, telemetry: false },

  app: {
    head: {
      htmlAttrs: {
        lang: "ru"
      },
      title: "2048",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${import.meta.env.NUXT_APP_BASE_URL || "/"}favicon.ico`
        }
      ]
    }
  },

  css: ['normalize.css'],

  spaLoadingTemplate: false,

  compatibilityDate: '2025-08-02',
  typescript: {
    strict: true
  },

  telemetry: false,

  eslint:{
    config: {
      nuxt: {
        sortConfigKeys: true
      }
    }
  },

  googleFonts: {
    families: {
      Roboto: {
        wght: [400]
      }
    },

    download:true,
    display: "swap"
  },

  stylelint: {
    lintOnStart: false,
    cache: false
  },
});
