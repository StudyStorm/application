import { defineNuxtConfig } from "nuxt";
import { execSync } from "node:child_process";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs-alt/auth",
    "@nuxtjs-alt/http",
    "@nuxtjs-alt/proxy",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@studystorm/nuxt-pwa",
    "@nuxt/image-edge",
    "nuxt-svgo",
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
  image: {},
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:3000",
      gitRef: execSync("git rev-parse --short HEAD").toString().trim(),
      apiURL:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.LOCAL_API_URL,
    },
  },
  svgoOptions: {
    svgo: false,
    defaultImport: "component",
  },
  http: {
    credentials: "include",
    baseURL: process.env.BASE_URL,
  },
  auth: {
    watchLoggedIn: true,
    globalMiddleware: true,
    strategies: {
      studyStorm: {
        name: "studyStorm",
        scheme: "~/schemes/StudyStormScheme",
        cookie: {
          server: true,
          name: "studystorm-session",
        },
        baseURL:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.LOCAL_API_URL,
      },
    },
  },
});
