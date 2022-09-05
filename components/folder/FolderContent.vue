<script setup lang="ts">
import Folder from "~/models/Folder";
import { computed } from "#imports";
import FolderContentBlock from "~/components/folder/FolderContentBlock.vue";
import FolderContentList from "~/components/folder/FolderContentList.vue";
const props = defineProps<{
  folder: Folder;
  mode: "list" | "block";
}>();

defineEmits(["showModalFolder"]);

const modes = {
  list: FolderContentList,
  block: FolderContentBlock,
};

const modeComponent = computed(() => modes[props.mode]);
</script>

<template>
  <component
    :is="modeComponent"
    :folder="folder"
    @show-modal-folder="$emit('showModalFolder')"
  />
</template>
