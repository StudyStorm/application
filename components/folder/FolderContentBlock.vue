<script setup lang="ts">
import { FolderPlusIcon } from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
import FolderCard from "~/components/FolderCard.vue";

defineProps<{
  folder: Folder;
}>();

defineEmits(["showModalFolder"]);
</script>
<template>
  <div
    class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6 2xl:grid-cols-7"
  >
    <div
      class="rounded-lg p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
      @click="$emit('showModalFolder')"
    >
      <div class="flex items-center space-x-4">
        <div class="w-10 shrink-0">
          <FolderPlusIcon />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {{ $t("app.classroom.folderButton") }}
          </p>
        </div>
      </div>
    </div>
    <folder-card
      v-for="subFolder in folder.children"
      :key="subFolder.id"
      :folder="subFolder"
    />
  </div>
</template>
