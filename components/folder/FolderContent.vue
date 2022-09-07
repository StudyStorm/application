<script setup lang="ts">
import Folder from "~/models/Folder";
import { Permission } from "~/types/app";
defineProps<{
  folder: Folder;
  mode: "list" | "block";
  showEdition: boolean;
  permission: Partial<Permission>;
}>();

const emit = defineEmits(["showFolderModal", "showDeckModal"]);
</script>

<template>
  <FolderContentList
    v-if="mode === 'list'"
    :folder="folder"
    :show-edition="showEdition"
    :permission="permission"
    @show-folder-modal="emit('showFolderModal')"
    @show-deck-modal="emit('showDeckModal')"
  />
  <FolderContentBlock
    v-else-if="mode === 'block'"
    :folder="folder"
    :show-edition="showEdition"
    :permission="permission"
    @show-folder-modal="emit('showFolderModal')"
    @show-deck-modal="emit('showDeckModal')"
  />
</template>
