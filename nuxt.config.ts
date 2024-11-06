// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,

  css: ["normalize.css/normalize.css"],

  modules: ["@nuxt/test-utils", "@nuxt/eslint"],

  typescript: {
    strict: true
  },

  future: {
    typescriptBundlerResolution: true
  },

  compatibilityDate: "2024-11-06"
});
