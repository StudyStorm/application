<script setup lang="ts">
import { ArrowUpOnSquareIcon } from "@heroicons/vue/24/outline/index.js";

const filePreview = ref<string | ArrayBuffer>(
  "/icons/default_profile_picture.svg"
);
const input = ref<HTMLInputElement>(null);
const emit = defineEmits(["validFile"]);

const dropFile = (e: DragEvent): void => {
  const file = e.dataTransfer.files[0];
  if (file) {
    renderPreview(file);
    emit("validFile", file);
  }
};

const selectPicture = (): void => {
  const files = input.value.files;

  if (files && files[0]) {
    const file = files[0];
    renderPreview(file);
    input.value.blur();
    emit("validFile", file);
  }
};

const renderPreview = (file: File): void => {
  if (!file) return;
  URL.revokeObjectURL(filePreview.value as string);
  filePreview.value = URL.createObjectURL(file);
};
</script>

<template>
  <label
    class="group relative block h-24 w-24 cursor-pointer overflow-hidden rounded-full ring-storm-blue focus-within:ring hover:ring"
    @drop.prevent="dropFile"
    @dragover.prevent
  >
    <span
      class="absolute block h-full w-full bg-cover bg-center group-focus-within:blur-sm group-hover:blur-sm"
      :style="{ 'background-image': `url(${filePreview})` }"
    />
    <span
      class="invisible absolute flex h-full w-full items-center justify-center bg-white/50 group-focus-within:visible group-hover:visible"
    >
      <ArrowUpOnSquareIcon class="h-10 w-10 text-storm-blue" />
    </span>
    <input
      ref="input"
      type="file"
      class="absolute opacity-0"
      v-bind="$attrs"
      @input="selectPicture"
    />
  </label>
</template>
