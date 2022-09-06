import { defineStore } from "pinia";
import { Pagination } from "../types/app";
import Report from "../models/Report";

export const useInboxStore = defineStore("inbox", () => {
  const inboxReports = ref<Pagination<Report>>(null);

  const pagination = computed(() => {
    return inboxReports.value.meta;
  });

  return {
    inboxReports,
    pagination,
    async fetchInboxReports(page = 1) {
      const { data } = await useFetchAPI<Pagination<Report>>("/v1/inbox", {
        method: "GET",
        params: { page: page },
      });

      inboxReports.value = data;
    },
    async markAsRead(read: boolean, reportId: string) {
      await useFetch(`/v1/inbox/${reportId}`, {
        method: "PATCH",
        body: {
          isRead: read,
        },
        credentials: "include",
        baseURL: useRuntimeConfig().apiURL,
        initialCache: false,
      });
      this.fetchInboxReports();
    },
  };
});
