<script setup lang="ts">
import Report from "~~/models/Report";

import { CheckBadgeIcon, TrashIcon } from "@heroicons/vue/24/outline/index.js";

const props = defineProps<{
  report: Report;
}>();

const emit = defineEmits(["toggleRead", "delete"]);

const setRead = () => {
  emit("toggleRead", !props.report.is_read, props.report.id);
};

const deleteReport = () => {
  emit("delete", props.report.id);
};

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("fr-CH").format(
    new Date(props.report.created_at)
  );
});
</script>

<template>
  <div
    class="group relative block rounded-lg border border-gray-200 p-4 py-6 shadow-md"
    :class="report.is_read ? 'text-gray-400' : 'text-storm-dark'"
  >
    <div
      class="invisible absolute -top-2 -left-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-red-500 p-1 text-xs font-bold text-white group-hover:visible"
      @click="deleteReport"
    >
      <TrashIcon class="h-4" />
    </div>
    <div class="flex items-center justify-between">
      <div class="truncate">
        <h5 class="mb-2 text-ellipsis font-bold tracking-tight">
          {{ report.message }}
        </h5>
        <div class="flex items-center justify-between">
          <p v-if="report.author" class="flex-1 truncate text-sm font-normal">
            {{
              $t("app.decks.createdBy", {
                name: `${report.author.first_name} ${report.author.last_name}`,
              })
            }}
          </p>
        </div>
        <i class="w-full text-xs">
          {{ formattedDate }}
        </i>
      </div>
      <div>
        <button
          class="bg-white transition hover:scale-105 hover:bg-gray-100"
          @click="setRead"
        >
          <CheckBadgeIcon class="h-8 bg-white" />
        </button>
      </div>
    </div>
  </div>
</template>
