import { defineStore } from "pinia";

export const useClassroomStore = defineStore("classroom", {
  state: () => ({
    classroom: null,
  }),
  actions: {
    async fetchClassroom(classroomId: string) {
      // todo
    },

    async createDeck() {
      console.log("Create folder deck");
    },

    async createFolder() {
      console.log("Create folder called");
    },
    async fetchPinnedClassrooms() {
      console.log("pinned classrooms");
      // TODO: call /v1/classrooms/joined
    },
  },
});
