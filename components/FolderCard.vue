<script setup lang="ts">
import { FolderIcon } from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
defineProps<{
  folder: Folder;
}>();
</script>

<template>
  <NuxtLink
    to="#"
    class="rounded-lg bg-gray-100 p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
  >
    <div class="flex items-center space-x-4">
      <div class="w-10 shrink-0">
        <FolderIcon />
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
          {{ folder.name }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
