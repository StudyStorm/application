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
      theme_color: "#374561",
      mobileAppIOS: true,
    },
    manifest: {
      name: "StudyStorm",
    },
    icon: {
      maskablePadding: 0,
      splash: {
        backgroundColor: "#374561",
      },
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
