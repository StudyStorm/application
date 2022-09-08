<script setup lang="ts">
import {
  ChevronRightIcon,
  Square2StackIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
import { computed } from "#imports";
import Deck from "~/models/Deck";
import { Permission } from "~/types/app";

const props = defineProps<{
  folder: Folder;
  permission: Partial<Permission>;
}>();

const emit = defineEmits(["showFolderModal", "showDeckModal"]);

type File = ((Folder & { type: "folder" }) | (Deck & { type: "deck" })) & {
  icon: unknown;
  url: unknown;
};

const files = computed(
  () =>
    [
      ...props.folder.children.map((f) => ({
        ...f,
        type: "folder",
        url: {
          name: "classroom-classroom-folder",
          params: {
            folder: f.id,
          },
        },
        icon: FolderIcon,
      })),
      ...props.folder.decks.map((d) => ({
        ...d,
        type: "deck",
        url: {
          name: "deck-id",
          params: {
            id: d.id,
          },
        },
        icon: Square2StackIcon,
      })),
    ].sort((a, b) => a.name.localeCompare(b.name)) as File[]
);
</script>
<template>
  <div class="mt-4">
    <div class="mb-4 flex space-x-4">
      <button
        v-if="permission?.write"
        type="button"
        class="flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="emit('showFolderModal')"
      >
        {{ $t("app.classroom.folderButton") }}
      </button>
      <button
        v-if="permission?.write"
        type="button"
        class="flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="emit('showDeckModal')"
      >
        {{ $t("app.classroom.decksButton") }}
      </button>
    </div>
    <div class="px-4 sm:px-6">
      <h2 class="text-sm font-medium text-storm-dark">
        {{ $t("app.classroom.content") }}
      </h2>
    </div>

    <ul
      role="list"
      class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
    >
      <li v-for="file in files" :key="file.id">
        <NuxtLink
          :to="file.url"
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
