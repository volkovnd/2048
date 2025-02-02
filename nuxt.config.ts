// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, telemetry: false },

  telemetry: false,

  css: ["normalize.css", "~/assets/global.css"],

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

  features: {
    inlineStyles: false
  },

  compatibilityDate: "2024-04-03",

  eslint: {
    checker: true
  }
});
