import { defineStore } from "pinia";
import Classroom from "~/models/Classroom";
import Folder from "~/models/Folder";
import User from "~~/models/User";
import { FormError, Pagination } from "~~/types/app";
import { useFetchAPI } from "~/composables/useFetchAPI";

export const useClassroomStore = defineStore("classroom", () => {
  const classroom = ref<Classroom>(null);
  const currentFolder = ref<Folder>(null);
  const members = ref<Pagination<User>>(null);
  const displayMode = ref<"list" | "block">("block");
  const showDeckCreationModal = ref(false);
  const showFolderCreationModal = ref(false);

  return {
    classroom,
    currentFolder,
    members,
    displayMode,
    showDeckCreationModal,
    showFolderCreationModal,
    async fetchClassroom(classroomId: string) {
      const { data, error } = await useFetchAPI<Classroom>(
        `v1/classrooms/${classroomId}`
      );

      if (error) {
        throw createError({
          statusCode: 404,
          statusMessage: "Classroom not found",
          fatal: true,
        });
      } else {
        classroom.value = data;
      }
    },

    async createDeck(deck: { parentFolderId: string; name: string }) {
      const { data, error } = await useFetchAPI<Folder, FormError>(
        `v1/folders/${deck.parentFolderId}/decks`,
        {
          method: "POST",
          body: {
            name: deck.name,
          },
        }
      );
      return { data, error };
    },

    async createFolder(folder: { parentFolderId: string; name: string }) {
      const { data, error } = await useFetchAPI<Folder, FormError>(
        `v1/folders/${folder.parentFolderId}`,
        {
          method: "POST",
          body: {
            name: folder.name,
          },
        }
      );
      return { data, error };
    },
    async fetchPinnedClassrooms() {
      console.log("pinned classrooms");
      // TODO: call /v1/classrooms/joined
    },
    async fetchCurrentFolder(folderId: string) {
      const { data: folder } = await useFetchAPI<Folder>(
        `/v1/folders/${folderId}`
      );

      currentFolder.value = folder;
    },
    async refreshCurrentFolder() {
      if (!currentFolder.value) return;
      await this.fetchCurrentFolder(currentFolder.value.id);
    },
    async fetchClassroomUsers(classroomId: string, limit = 5) {
      const { data } = await useFetchAPI<Pagination<User>>(
        `/v1/classrooms/${classroomId}/users`,
        { params: { limit: limit } }
      );

      members.value = data;
    },
    async moveDeckInFolder(folder: Folder, deckId: string) {
      await useFetchAPI(`/v1/decks/${deckId}`, {
        method: "PATCH",
        useFetch: true,
        body: {
          folderId: folder.id,
        },
      });
    },
    async moveFolderInFolder(folder: Folder, folderId: string) {
      await useFetchAPI(`/v1/folders/${folderId}`, {
        method: "PATCH",
        useFetch: true,
        body: {
          parentId: folder.id,
        },
      });
    },
  };
});
