import { defineStore } from "pinia";
import { Pagination } from "~/types/app";
import Report from "../models/Report";
import { useFetchAPI } from "#imports";

export const useInboxStore = defineStore("inbox", () => {
  const inboxReports = ref<Pagination<Report>>(null);

  const pagination = computed(() => {
    return inboxReports.value.meta;
  });

  const unReadReports = computed((): number => {
    return inboxReports.value.data.filter((report) => !report.is_read).length;
  });

  return {
    inboxReports,
    pagination,
    unReadReports,
    async fetchInboxReports(page = 1) {
      const { data } = await useFetchAPI<Pagination<Report>>("/v1/inbox", {
        method: "GET",
        params: { page: page, limit: 5 },
      });

      inboxReports.value = data;
    },
    async markAsRead(read: boolean, reportId: string) {
      await useFetchAPI(`/v1/inbox/${reportId}`, {
        method: "PATCH",
        body: {
          isRead: read,
        },
        useFetch: true,
      });
      await this.fetchInboxReports();
    },
    async deleteReport(reportId: string) {
      await useFetchAPI(`/v1/inbox/${reportId}`, {
        method: "DELETE",
      });
      await this.fetchInboxReports();
    },
  };
});
