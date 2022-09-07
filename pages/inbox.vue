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
    <div class="mx-2 mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md lg:mt-8">
      <InboxCard
        v-for="report in store.inboxReports.data"
        :key="report.id"
        :report="report"
        @toggle-read="store.markAsRead"
        @delete="store.deleteReport"
      />
      <div v-if="store.inboxReports.data.length === 0">
        <div class="overflow-hidden bg-white text-center shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t("app.inbox.empty.title") }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              {{ $t("app.inbox.empty.content") }}
            </p>
          </div>
        </div>
      </div>
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
