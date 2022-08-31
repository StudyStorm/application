<script setup lang="ts">
import Deck from "../models/Deck";

import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid/index.js";

const props = defineProps<{
  deck: Deck;
}>();

const upvote = () => {
  console.log("upvote");
};

const downvote = () => {
  console.log("downvote");
};

const color = computed((): string => {
  return `background-color: hsl(${props.deck.id
    .split("")
    .reduce((a, b) => (a + b.charCodeAt(0)) % 360, 0)}, 100%, 80%)`;
});
</script>

<template>
  <NuxtLink
    :to="`/deck/${deck.id}`"
    class="block max-w-sm rounded-lg border border-gray-200 p-4 shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
    :style="color"
  >
    <div class="flex items-center justify-between">
      <span>N card</span>
      <span>Classroom name</span>
    </div>
    <div class="my-4 flex items-center justify-between">
      <h5
        class="mb-2 truncate text-2xl font-bold tracking-tight text-storm-dark"
      >
        {{ deck.name }}
      </h5>
      <div
        class="flex flex-col items-center text-sm font-medium text-storm-dark"
      >
        <ChevronUpIcon
          class="h-6 w-6 hover:scale-125 hover:text-emerald-500"
          @click.prevent="upvote"
        />
        <span>{{ deck.formattedVotes }}</span>
        <ChevronDownIcon
          class="h-6 w-6 hover:scale-125 hover:text-red-500"
          @click.prevent="downvote"
        />
      </div>
    </div>
    <div>
      <p class="font-normal text-storm-dark">
        {{ $t("app.decks.createdBy", { name: deck.creator.fullname }) }}
      </p>
    </div>
  </NuxtLink>
</template>
