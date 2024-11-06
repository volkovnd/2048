// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,

  modules: ["@nuxt/test-utils"],

  compatibilityDate: "2024-07-04"
});
