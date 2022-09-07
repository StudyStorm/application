<script setup lang="ts">
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/24/solid/index.js";
defineProps<{
  path: { id: string; name: string }[];
  root?: { id: string; name: string };
}>();
</script>
<template>
  <h1 class="flex text-lg font-medium leading-6 text-storm-dark sm:truncate">
    <nuxt-link
      :to="{
        name: 'classroom-classroom-folder',
        params: {
          folder: (root ?? path[0]).id,
        },
      }"
      class="flex items-center hover:text-storm-blue hover:underline"
    >
      <HomeIcon class="mx-1 mt-1 h-5 w-5" aria-hidden="true" />
      {{ (root ?? path[0]).name }}
    </nuxt-link>
    <template v-for="folder in path.slice(1)" :key="folder.id">
      <ChevronRightIcon
        class="mx-1 mt-1 h-5 w-5 text-storm-dark"
        aria-hidden="true"
      />
      <nuxt-link
        :to="{
          name: 'classroom-classroom-folder',
          params: {
            folder: folder.id,
          },
        }"
        class="flex items-center hover:text-storm-blue hover:underline"
        >{{ folder.name }}</nuxt-link
      >
    </template>
  </h1>
</template>
