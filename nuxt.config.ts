import { defineNuxtConfig } from "nuxt";
import { execSync } from "node:child_process";
// https://v3.nuxtjs.org/api/configuration/nuxt.config

function gitRef() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    console.error("Failed to get git revision", e);
    return "unknown";
  }
}

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
      { code: "fr", iso: "fr-FR", name: "Français", file: "fr-FR.yaml" },
      { code: "en", iso: "en-US", name: "English", file: "en-US.yaml" },
    ],
    langDir: "locales/",
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
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
      gitRef: gitRef(),
      apiURL:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.LOCAL_API_URL,
    },
  },
  http: {
    credentials: "include",
    baseURL: process.env.BASE_URL,
  },
  auth: {
    watchLoggedIn: true,
    globalMiddleware: true,
    redirect: {
      home: "/dashboard",
      login: "/login",
      logout: "/",
      callback: "/login",
    },
    strategies: {
      studyStorm: {
        name: "studyStorm",
        scheme: "~/schemes/StudyStormScheme",
        cookie: {
          server: true,
          name: "studystorm-session",
          options: {
            secure: true,
          },
        },
        baseURL:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.LOCAL_API_URL,
      },
    },
  },
});
