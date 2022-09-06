<script setup lang="ts">
import Folder from "~/models/Folder";
const props = defineProps<{
  folder: Folder;
  mode: "list" | "block";
}>();
</script>

<template>
  <FolderContentList v-if="mode === 'list'" :folder="folder" />
  <FolderContentBlock v-else-if="mode === 'block'" :folder="folder" />
</template>
