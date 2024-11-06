// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,

  css: ["normalize.css/normalize.css"],

  modules: ["@nuxt/test-utils", "@nuxt/eslint"],

  compatibilityDate: "2024-07-04"
});
