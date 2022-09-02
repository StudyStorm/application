<script setup lang="ts">
const filePreview = ref<string | ArrayBuffer>(
  "/icons/default_profile_picture.svg"
);
const input = ref(null);

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
    emit("validFile", file);
  }
};

const renderPreview = (file: File): void => {
  if (!file) return;

  let reader = new FileReader();
  reader.onload = (e) => {
    filePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div>
    <div
      class="mr-4 h-48 w-48 flex-none cursor-pointer rounded-full bg-cover bg-center"
      :style="{ 'background-image': `url(${filePreview})` }"
      @drop.prevent="dropFile"
      @dragover.prevent
    ></div>
    <input
      ref="input"
      type="file"
      class="mr-4 hidden h-48 w-48 flex-none rounded-full"
      @input="selectPicture"
    />
  </div>
</template>
