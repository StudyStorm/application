import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@kevinmarrec/nuxt-pwa",
  ],
  pwa: {
    meta: {
      name: "StudyStorm",
      theme_color: "#374561",
      description: "StudyStorm is a tool for all students.",
      mobileApp: true,
      mobileAppIOS: true,
    },
    manifest: {
      name: "StudyStorm",
      short_name: "StudyStorm",
      theme_color: "#374561",
      icons: [],
      start_url: "/",
      description: "StudyStorm is a tool for all students.",
      background_color: "#2E333F",
      display: "standalone",
    },
    icon: {
      maskablePadding: 0,
    },
  },
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
  head: {
    title: "StudyStorm",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "StudyStorm",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
  },
});
