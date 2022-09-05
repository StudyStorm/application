<script setup lang="ts">
import Folder from "~/models/Folder";
import { computed, resolveComponent } from "#imports";
const props = defineProps<{
  folder: Folder;
  mode: "list" | "block";
}>();

defineEmits(["showModalFolder"]);

const modes = {
  list: resolveComponent("FolderContentList"),
  block: resolveComponent("FolderContentBlock"),
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
