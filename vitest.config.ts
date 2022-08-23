import { fileURLToPath, URL } from "url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["tests/**/*.test.ts"],
  },
});
