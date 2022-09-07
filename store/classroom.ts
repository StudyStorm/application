import { defineStore } from "pinia";
import Classroom from "~/models/Classroom";
import Folder from "~/models/Folder";
import User from "~~/models/User";
import { FormError, Pagination } from "~~/types/app";
import { useFetchAPI } from "~/composables/useFetchAPI";
import { useEventBus } from "@vueuse/core";

export const useClassroomStore = defineStore("classroom", () => {
  const bus = useEventBus("studystorm");
  const classroom = ref<Classroom>(null);
  const currentFolder = ref<Folder>(null);
  const members = ref<Pagination<User>>(null);
  const displayMode = ref<"list" | "block">("block");
  const showDeckCreationModal = ref(false);
  const showFolderCreationModal = ref(false);

  const searchFilter = ref("");
  const filteredClassrooms = ref<Pagination<Classroom>>(null);
  const pinnedClassrooms = ref<Pagination<Classroom>>(null);
  const LOCAL_STORAGE_KEY = "lastVisitedClassrooms";
  const MAX_LAST_VISITED_CLASSROOMS = 3;
  const lastVisitedClassrooms = ref<Classroom[]>([]);

  const pagination = computed(() => {
    return filteredClassrooms.value.meta;
  });

  const paginationMembers = computed(() => {
    return members.value.meta;
  });

  const classrooms = computed(() => {
    return filteredClassrooms.value.data;
  });

  return {
    classroom,
    currentFolder,
    members,
    displayMode,
    showDeckCreationModal,
    showFolderCreationModal,
    searchFilter,
    pinnedClassrooms,
    filteredClassrooms,
    LOCAL_STORAGE_KEY,
    MAX_LAST_VISITED_CLASSROOMS,
    lastVisitedClassrooms,
    pagination,
    paginationMembers,
    classrooms,

    addVisitedClassroom(classroomId: string | number) {
      // Retrieve existing from localstorage
      let visited = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

      // Remove the classroom id if it's already in the list to prevent duplicates
      visited = visited.filter((id: string | number) => id !== classroomId);

      // Remove the oldest classroom if we have reached the classroom number limit
      if (visited.length === MAX_LAST_VISITED_CLASSROOMS) {
        visited.pop();
      }

      // add at first position
      visited.unshift(classroomId);

      // Update local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visited));
    },

    async fetchLastVisited() {
      const classroomIds: string[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      if (!classroomIds) return [];

      lastVisitedClassrooms.value = (
        await Promise.all(
          classroomIds.map(
            async (id) =>
              (
                await useFetchAPI<Classroom>(`v1/classrooms/${id}`)
              ).data
          )
        )
      ).filter((c) => c !== null);
    },

    async fetchClassrooms(page = 1) {
      const { data } = await useFetchAPI<Pagination<Classroom>>(
        `/v1/classrooms?page=${page}&search=${this.searchFilter}`,
        {
          method: "GET",
        }
      );

      filteredClassrooms.value = data;
    },
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

    async createClassroom(classroom: { name: string; visibility: string }) {
      const { data, error } = await useFetchAPI<Classroom, FormError>(
        `v1/classrooms/`,
        {
          method: "POST",
          body: classroom,
        }
      );
      if (data) {
        bus.emit("classroom:created");
      }
      return { data, error };
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
      if (data) {
        bus.emit("deck:created");
      }
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
      if (data) {
        bus.emit("folder:created");
      }
      return { data, error };
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
    async fetchClassroomUsers(classroomId: string, limit = 5, page = 1) {
      const { data } = await useFetchAPI<Pagination<User>>(
        `/v1/classrooms/${classroomId}/users`,
        { params: { limit: limit, page: page } }
      );

      members.value = data;
    },
    async moveDeckInFolder(folder: Folder, deckId: string) {
      const response = await useFetchAPI(`/v1/decks/${deckId}`, {
        method: "PATCH",
        useFetch: true,
        body: {
          folderId: folder.id,
        },
      });
      if (response.data) {
        bus.emit("deck:moved");
      }
      return response;
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

    async subscribe(classroomId: string) {
      await useFetchAPI(`/v1/classrooms/${classroomId}/join`, {
        method: "POST",
      });
      this.fetchClassroom(classroomId);
    },

    async unsubscribe(classroomId: string) {
      await useFetchAPI(`/v1/classrooms/${classroomId}/leave`, {
        method: "POST",
      });
    },

    async addMember(classroomId: string, email: string, accessRight: string) {
      await useFetchAPI("v1/classrooms/users", {
        method: "POST",
        body: {
          classroomId: classroomId,
          email: email,
          accessRight: accessRight,
        },
      });
    },

    async changeMemberRole(
      classroomId: string,
      email: string,
      accessRight: string
    ) {
      await useFetchAPI("v1/classrooms/users", {
        method: "PATCH",
        body: {
          classroomId: classroomId,
          email: email,
          accessRight: accessRight,
        },
        useFetch: true,
      });
    },

    async deleteClassroom(classroomId: string) {
      const response = await useFetchAPI(`/v1/classrooms/${classroomId}`, {
        method: "DELETE",
      });
      if (!response.error) {
        bus.emit("classroom:deleted");
      }
    },
  };
});
