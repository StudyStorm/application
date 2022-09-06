import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: { ...useNuxtApp().$auth.user },
    picture: null,
  }),
  actions: {
    setPicture(newPicture: File) {
      this.picture = newPicture;
    },
    async updateProfile() {
      const config = useRuntimeConfig();

      const { id, created_at, picture_url, ...payload } = this.profile;

      const formData = getFormData(payload);

      if (this.picture) {
        formData.append("profilePicture", this.picture);
      }

      const { error } = await useFetch("/v1/profile", {
        method: "PATCH",
        body: formData,
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

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
