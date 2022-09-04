import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({}),
  actions: {
    async updateProfile() {
      // TODO +  update picture
    },
    async deleteProfile() {
      // TODO: delete
    },
  },
});
