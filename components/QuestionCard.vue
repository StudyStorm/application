<script setup lang="ts">
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
    class="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 text-center shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
    @mouseenter="showEdition = true"
    @mouseleave="showEdition = false"
  >
    <span
      class="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-storm-blue text-xs font-semibold text-white"
    >
      {{ number }}
    </span>
    <p class="p-6">{{ card.content.question }}</p>

    <div v-if="showEdition">
      <hr />
      <div class="py-2">
        <button
          type="button"
          class="focus:storm-darkblue rounded-md bg-storm-darkblue px-4 py-2 text-sm font-medium text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          {{ $t("app.decks.editCard") }}
        </button>
      </div>
    </div>
  </div>
</template>
