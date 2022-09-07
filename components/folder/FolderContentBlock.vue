<script setup lang="ts">
import {
  FolderPlusIcon,
  SquaresPlusIcon,
} from "@heroicons/vue/24/outline/index.js";
import Folder from "~/models/Folder";
import FolderCard from "~/components/FolderCard.vue";
import DeckCard from "~/components/DeckCard.vue";
import { useClassroomStore } from "~/store/classroom";

const classroomStore = useClassroomStore();

defineProps<{
  folder: Folder;
}>();

function refresh() {
  classroomStore.refreshCurrentFolder();
}

const emit = defineEmits(["showFolderModal", "showDeckModal"]);
</script>
<template>
  <div class="s-grid mt-8">
    <div
      class="flex cursor-pointer items-center rounded-lg p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
      @click="emit('showFolderModal')"
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
      :use-drop="true"
      :use-drag="true"
      @move-file="refresh"
    />
  </div>
  <hr class="my-4" />
  <div class="s-grid">
    <div
      class="flex cursor-pointer items-center rounded-lg p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
      @click="emit('showDeckModal')"
    >
      <div class="flex items-center space-x-4">
        <div class="w-10 shrink-0">
          <SquaresPlusIcon />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {{ $t("app.classroom.decksButton") }}
          </p>
        </div>
      </div>
    </div>
    <deck-card
      v-for="deck in folder.decks"
      :key="deck.id"
      :deck="deck"
      :use-drag="true"
    />
  </div>
</template>
