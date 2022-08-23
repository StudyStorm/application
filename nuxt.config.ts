import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: [
      { code: "fr", iso: "fr-FR", file: "fr-FR.yaml" },
      { code: "en", iso: "en-US", file: "en-US.yaml" },
    ],
    langDir: "locales/",
    defaultLocale: "fr",
    vueI18n: {
      fallbackLocale: "fr",
    },
  },
});
