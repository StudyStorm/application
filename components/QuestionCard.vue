<script setup lang="ts">
import { PencilIcon } from "@heroicons/vue/24/solid/index.js";
import Card from "~~/models/Card";

defineProps<{
  card: Card;
  number: number;
}>();
</script>

<template>
  <s-card-squared :key="card.id">
    <div
      class="invisible absolute -top-2 -right-2 inline-flex h-8 w-8 items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-storm-purple p-1 text-xs font-bold text-white group-hover:visible dark:border-gray-900"
    >
      <PencilIcon />
    </div>
    <p
      class="flex min-h-0 flex-1 items-center overflow-hidden hover:overflow-y-auto"
    >
      {{ card.content.question }}
    </p>
    <div class="text-xs">
      {{ number }}
    </div>
  </s-card-squared>
</template>
