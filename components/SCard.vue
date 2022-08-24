<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <a
    href="#"
    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
      {{ title }}
    </h5>
    <p class="font-normal text-gray-700">Text of card</p>
  </a>
</template>
