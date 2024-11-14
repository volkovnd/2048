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
          href: `${import.meta.env.NUXT_APP_BASE_URL || "/"}favicon.ico`
        }
      ]
    }
  },

  modules: [
    "@nuxt/test-utils",
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt"
  ],

  googleFonts: {
    useStylesheet: true,
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

  future: {
    typescriptBundlerResolution: true
  },

  features: {
    inlineStyles: false
  },

  nitro: {
    preset: "static"
  },

  compatibilityDate: "2024-11-06",

  stylelint: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/.vscode/**",
      "virtual:"
    ]
  }
});
