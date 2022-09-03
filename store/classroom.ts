import { defineStore } from "pinia";

export const useClassroomStore = defineStore("classroom", {
  state: () => ({
    classroom: null,
  }),
  actions: {
    async fetchClassroom(classroomId: string) {
      console.log("fetching", classroomId);
    },

    async createDeck() {
      console.log("Create folder deck");
    },

    async createFolder() {
      console.log("Create folder called");
    },
  },
});
