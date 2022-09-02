import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    async login(credentials: { email: string; password: string }) {
      await useFetchAPI("/v1/login", {
        method: "POST",
        body: credentials,
      });
    },

    async register() {
      console.log("register");
    },

    isLoggedIn() {
      // console.log(this.$store.state.auth);
    },
  },
});
