<script setup lang="ts">
import Folder from "~/models/Folder";
defineProps<{
  folder: Folder;
  mode: "list" | "block";
}>();

const emit = defineEmits(["showFolderModal", "showDeckModal"]);
</script>

<template>
  <FolderContentList
    v-if="mode === 'list'"
    :folder="folder"
    @show-folder-modal="emit('showFolderModal')"
    @show-deck-modal="emit('showDeckModal')"
  />
  <FolderContentBlock
    v-else-if="mode === 'block'"
    :folder="folder"
    @show-folder-modal="emit('showFolderModal')"
    @show-deck-modal="emit('showDeckModal')"
  />
</template>
