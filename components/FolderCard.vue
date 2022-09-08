<script setup lang="ts">
import { FolderIcon } from "@heroicons/vue/24/outline/index.js";
import { TrashIcon } from "@heroicons/vue/24/solid/index.js";
import Folder from "~/models/Folder";
import { useDrag } from "#imports";
import useDrop from "~/composables/useDrop";
import { useClassroomStore } from "~/store/classroom";
import { Permission } from "~/types/app";
const props = defineProps<{
  folder: Folder;
  useDrop?: boolean;
  useDrag?: boolean;
  permission: Partial<Permission>;
}>();

const el = ref<HTMLDivElement>();
const store = useClassroomStore();
const emits = defineEmits<{
  (event: "update"): void;
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
    emits("update");
  });
}
if (props.useDrag) {
  useDrag(el, () => ({
    type: "folder",
    id: props.folder.id,
  }));
}

function deleteFolder() {
  store.deleteFolder(props.folder);
  emits("update");
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
    <div class="group flex items-center space-x-4 truncate">
      <div class="w-10 shrink-0">
        <FolderIcon />
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
          {{ folder.name }}
        </p>
      </div>
      <div class="hidden group-hover:block">
        <confirm-modal v-if="permission?.delete" @confirm="deleteFolder">
          <template #title>{{ $t("app.folders.modal.delete.title") }}</template>
          <template #content>{{
            $t("app.folders.modal.delete.content")
          }}</template>
          <template #default="{ open }">
            <div
              class="inline-flex h-8 w-8 items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-red-800 p-1 text-xs font-bold text-white hover:scale-110"
              @click.prevent="open"
            >
              <TrashIcon />
            </div>
          </template>
        </confirm-modal>
      </div>
    </div>
  </NuxtLink>
</template>
