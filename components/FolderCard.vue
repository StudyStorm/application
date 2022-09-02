<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/deck`"
    class="block w-36 rounded-lg border border-gray-200 bg-gray-300 p-4 shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-200"
  >
    <div class="my-4 flex flex-col items-center justify-center">
      <img src="/images/folderIcon.png" alt="Folder icon" />
      <h5
        class="mb-2 truncate text-center text-sm tracking-tight text-storm-dark"
      >
        {{ name }}
      </h5>
    </div>
  </NuxtLink>
</template>
