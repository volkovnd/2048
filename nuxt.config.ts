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
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${import.meta.env.BASE_URL || "/"}favicon.ico`
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

  typescript: {
    strict: true
  },

  features: {
    inlineStyles: false
  },

  nitro: {
    preset: "static"
  },

  compatibilityDate: "2024-04-03",

  eslint: {
    checker: true
  },

  stylelint: {
    lintOnStart: false,
    build: true,
    dev: false,

    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/.vscode/**",
      "**/public/**",
      "virtual:"
    ],
    config: {
      extends: [
        "stylelint-config-recommended",
        "stylelint-config-recommended-vue",
        "stylelint-config-recess-order"
      ]
    }
  }
});
