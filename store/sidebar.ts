import { defineStore } from "pinia";
import { useFetchAPI } from "~/composables/useFetchAPI";
import { Pagination } from "~/types/app";
import Classroom from "~/models/Classroom";
import { useAppBus } from "~/composables/useAppBus";

export const useSidebarStore = defineStore("sidebar", () => {
  const pinnedClassrooms = ref<Classroom[]>([]);
  const bus = useAppBus();
  async function fetchPinnedClassrooms(page = 1) {
    const { data: classrooms } = await useFetchAPI<Pagination<Classroom>>(
      `/v1/classrooms/joined`,
      {
        params: {
          page,
        },
        method: "GET",
      }
    );
    if (classrooms) {
      pinnedClassrooms.value = classrooms.data;
    }
  }

  bus.on(async (event) => {
    if (event === "classroom:created" || event === "classroom:deleted") {
      await fetchPinnedClassrooms();
    }
  });

  return {
    pinnedClassrooms,
    fetchPinnedClassrooms,
  };
});
