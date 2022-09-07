<script setup lang="ts">
import { useInboxStore } from "~~/store/inbox";

const store = useInboxStore();
await store.fetchInboxReports();

const currentPage = ref(store.pagination.current_page);

const changePage = (page: number) => {
  if (page > 0 && page <= store.pagination.last_page) {
    currentPage.value = page;
    store.fetchInboxReports(currentPage.value);
  }
};
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0">
        <h1
          class="flex items-center text-lg font-medium leading-6 text-storm-dark sm:truncate"
        >
          {{ $t("app.inbox.title") }}
        </h1>
      </div>
    </div>
    <div class="space-y-6 sm:mx-auto sm:w-full sm:max-w-md lg:mt-8">
      <InboxCard
        v-for="report in store.inboxReports.data"
        :key="report.id"
        :report="report"
        @toggle-read="store.markAsRead"
        @delete="store.deleteReport"
      ></InboxCard>
      <div class="mt-4 flex justify-center">
        <s-paginator
          :current-page="currentPage"
          :last="store.pagination.last_page"
          :max-visible="5"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>
