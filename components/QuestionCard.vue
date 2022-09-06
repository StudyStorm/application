<script setup lang="ts">
import { PencilIcon } from "@heroicons/vue/24/solid/index.js";
import Card from "~~/models/Card";

defineProps<{
  card: Card;
  number: number;
}>();

const showEdition = ref(false);
</script>

<template>
  <div
    :key="card.id"
    class="pb-full h-0 w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 text-center shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
    style="padding-bottom: 100%"
    @mouseenter="showEdition = true"
    @mouseleave="showEdition = false"
  >
    <div
      class="absolute -top-2 -left-2 z-0 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-storm-blue p-1 text-xs font-bold text-white dark:border-gray-900"
    >
      {{ number }}
    </div>
    <div
      v-if="showEdition"
      class="absolute -top-2 -right-2 z-10 inline-flex h-8 w-8 items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-storm-purple p-1 text-xs font-bold text-white dark:border-gray-900"
    >
      <PencilIcon />
    </div>
    <p class="overflow-hidden text-ellipsis p-6">{{ card.content.question }}</p>
    {{ card.id }}
  </div>
</template>
