<script setup lang="ts">
import { FolderIcon } from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
import { useDrag } from "#imports";
import useDrop from "~/composables/useDrop";
import { useClassroomStore } from "~/store/classroom";
const props = defineProps<{
  folder: Folder;
  useDrop?: boolean;
  useDrag?: boolean;
}>();

const el = ref<HTMLDivElement>();
const store = useClassroomStore();
const emits = defineEmits<{
  (event: "moveFile"): void;
}>();

if (props.useDrop) {
  useDrop<{
    type: "folder" | "deck";
    id: string;
  }>(el, async (data) => {
    if (data.type === "deck") {
      await store.moveDeckInFolder(props.folder, data.id);
    } else if (data.type === "folder") {
      await store.moveFolderInFolder(props.folder, data.id);
    }
    emits("moveFile");
  });
}
if (props.useDrag) {
  useDrag(el, () => ({
    type: "folder",
    id: props.folder.id,
  }));
}
</script>

<template>
  <NuxtLink
    ref="el"
    :to="{
      name: 'classroom-classroom-folder',
      params: {
        folder: folder.id,
      },
    }"
    class="rounded-lg bg-gray-100 p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
  >
    <div class="flex items-center space-x-4 truncate">
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
