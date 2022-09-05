import { defineStore } from "pinia";
import { FormError } from "~/types/app";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: { ...useNuxtApp().$auth.user },
  }),
  actions: {
    async updateProfile() {
      const config = useRuntimeConfig();
      const { id, created_at, ...payload } = this.profile;
      const { error } = await useFetch("/v1/profile", {
        method: "PATCH",
        body: payload,
        credentials: "include",
        baseURL: config.apiURL,
        initialCache: false,
      });

      if (error.value) {
        console.log(error.value);
        return error;
      } else {
        this.profile.password = null;
        await useNuxtApp().$auth.fetchUser();
      }
    },
    async deleteProfile() {
      const { error } = await useFetchAPI("/v1/profile", {
        method: "DELETE",
      });
      console.log(error);

      if (error) {
        return error;
      } else {
        useNuxtApp().$auth.logout();
      }
    },
  },
});
