import { defineStore } from "pinia";
import Classroom from "~~/models/Classroom";

export const useClassroomStore = defineStore("classroom", {
  state: () => ({
    classroom: null,
  }),
  actions: {
    async fetchClassroom(classroomId: string) {
      console.log(classroomId);
      // const { data } = await useFetchAPI<Classroom>(
      //   `/v1/classrooms/${classroomId}`
      // );
      // this.classroom = data.value;
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
