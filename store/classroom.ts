import { defineStore } from "pinia";
import Classroom from "~/models/Classroom";
import Folder from "~/models/Folder";

export const useClassroomStore = defineStore("classroom", () => {
  const classroom = ref<Classroom>(null);
  return {
    classroom,
    async fetchClassroom(classroomId: string) {
      const { data } = await useFetchAPI<Classroom>(
        `v1/classrooms/${classroomId}`
      );
      classroom.value = data;
      return data;
    },

    async createDeck() {
      // Create a new deck
    },

    async createFolder(parentFolderId: string, name: string) {
      const { data } = await useFetchAPI<Folder>(
        `v1/folders/${parentFolderId}`,
        {
          method: "POST",
          body: {
            name,
          },
        }
      );
      return data;
    },
    async fetchPinnedClassrooms() {
      console.log("pinned classrooms");
      // TODO: call /v1/classrooms/joined
    },
  };
});
