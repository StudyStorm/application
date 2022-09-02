<script setup lang="ts">
import { useDecksStore } from "~/store/decks";
const store = useDecksStore();
const route = useRoute();

// TODO: Fetch the deck / Check deck access
store.addUsedDeck(route.params.id as string);
</script>

<template>
  <div
    class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="min-w-0 flex-1">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        Deck #{{ $route.params.id }}
      </h1>
    </div>
  </div>
</template>
