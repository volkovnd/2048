// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, telemetry: false },

  telemetry: false,

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

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
    "@vueuse/nuxt",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode"
  ],

  spaLoadingTemplate: false,

  googleFonts: {
    families: {
      Roboto: {
        wght: [400]
      }
    },

    display: "swap"
  },

  compatibilityDate: "2025-02-14",

  eslint: {
    checker: true
  }
});