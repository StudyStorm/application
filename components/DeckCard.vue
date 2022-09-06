<script setup lang="ts">
import Deck from "../models/Deck";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/vue/24/solid/index.js";

const props = defineProps<{
  deck: Deck;
}>();

const color = computed((): string => {
  return `background-color: hsl(${props.deck.id
    .split("")
    .reduce((a, b) => (a + b.charCodeAt(0)) % 360, 0)}, 100%, 80%)`;
});

const formattedVotes = computed(() => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(props.deck.votes);
});
</script>

<template>
  <NuxtLink
    class="block max-w-sm rounded-lg border border-gray-200 p-4 shadow-md transition hover:scale-105 hover:bg-gray-100"
    :to="{
      name: 'deck-id',
      params: {
        id: deck.id,
      },
    }"
    :style="color"
  >
    <div class="flex items-center justify-between">
      <div>
        <h5
          class="mb-2 truncate text-2xl font-bold tracking-tight text-storm-dark"
        >
          {{ deck.name }}
        </h5>
        <div>
          <p class="truncate text-sm font-normal text-storm-dark">
            {{
              $t("app.decks.createdBy", {
                name: `${deck.creator.first_name} ${deck.creator.last_name}`,
              })
            }}
          </p>
        </div>
      </div>
      <div
        class="flex items-center rounded-xl px-2 font-medium"
        :class="
          deck.votes < 0
            ? 'text-red-500 bg-red-200'
            : 'text-green-500 bg-emerald-200'
        "
      >
        <span>{{ formattedVotes }}</span>
        <HandThumbUpIcon
          v-if="deck.votes >= 0"
          class="ml-1 w-4 text-emerald-500"
        />
        <HandThumbDownIcon v-else class="ml-1 w-4 text-red-500" />
      </div>
    </div>
  </NuxtLink>
</template>
