// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,

  app: {
    head: {
      htmlAttrs: {
        lang: "ru"
      }
    }
  },

  modules: ["@nuxt/test-utils", "@nuxt/eslint", "@nuxtjs/stylelint-module"],

  typescript: {
    strict: true
  },

  future: {
    typescriptBundlerResolution: true
  },

  features: {
    inlineStyles: false
  },

  compatibilityDate: "2024-11-06"
});
