<script setup lang="ts">
import { CheckBadgeIcon } from "@heroicons/vue/24/outline/index.js";
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
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {{ $t("app.inbox.title") }}
        </h1>
      </div>
    </div>
    <div class="space-y-6 sm:mx-auto sm:w-full sm:max-w-md lg:mt-8">
      {{ store.inboxReports.meta }}
      <div
        v-for="report in store.inboxReports.data"
        :key="report.id"
        class="block rounded-lg border border-gray-200 p-4 shadow-md"
        :class="report.is_read ? 'text-gray-400' : 'text-storm-dark'"
      >
        <div class="flex items-center justify-between">
          <div class="truncate">
            <h5 class="mb-2 text-ellipsis font-bold tracking-tight">
              {{ report.message }}
            </h5>
            <div>
              <p v-if="report.author" class="truncate text-sm font-normal">
                {{
                  $t("app.decks.createdBy", {
                    name: `${report.author.first_name} ${report.author.last_name}`,
                  })
                }}
              </p>
            </div>
          </div>
          <div>
            <button
              class="bg-white transition hover:scale-105 hover:bg-gray-100"
              @click="store.markAsRead(!report.is_read, report.id)"
            >
              <CheckBadgeIcon class="h-8 bg-white" />
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-center">
        <s-paginator
          :current-page="currentPage"
          :last="store.pagination.last_page"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>
