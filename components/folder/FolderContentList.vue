<script setup lang="ts">
import {
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
import { computed } from "#imports";
import Deck from "~/models/Deck";

const props = defineProps<{
  folder: Folder;
}>();

type File = ((Folder & { type: "folder" }) | (Deck & { type: "deck" })) & {
  icon: unknown;
};

const files = computed(
  () =>
    [
      ...props.folder.children.map((f) => ({
        ...f,
        type: "folder",
        icon: FolderIcon,
      })),
      ...props.folder.decks.map((d) => ({
        ...d,
        type: "deck",
        icon: ClipboardDocumentListIcon,
      })),
    ].sort((a, b) => a.name.localeCompare(b.name)) as File[]
);
</script>
<template>
  <div class="mt-10">
    <div class="px-4 sm:px-6">
      <h2 class="text-sm font-medium text-storm-dark">Projects</h2>
    </div>
    <ul
      role="list"
      class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
    >
      <li v-for="file in files" :key="file.id">
        <NuxtLink
          :to="`/deck/${file.id}`"
          class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
        >
          <span class="flex items-center space-x-3 truncate">
            <component
              :is="file.icon"
              class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate text-sm font-medium leading-6">
              {{ file.name }}
            </span>
          </span>
          <ChevronRightIcon
            class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
