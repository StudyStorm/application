<script setup lang="ts">
import { ref } from "#imports";
import { useDecksStore } from "~/store/decks";
import {
  PlusIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline/index.js";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid/index.js";
import CreateCard from "~/components/deck/CreateCard.vue";
const store = useDecksStore();
const route = useRoute();
await store.fetchDeck(route.params.id as string);
await store.fetchDeckUserRating(route.params.id as string);
onMounted(async () => {
  store.addUsedDeck(route.params.id as string);
});
const showModal = ref(false);
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="flex min-w-0 flex-1 items-center justify-between">
        <div>
          <h1
            class="text-storm-dark flex-row text-lg font-medium leading-6 sm:truncate"
          >
            {{ store.currentDeck.name }}
          </h1>
          <span class="text-storm-dark text-sm sm:truncate">{{
            $t("app.decks.createdBy", {
              name: `${store.currentDeck.creator.first_name} ${store.currentDeck.creator.last_name}`,
            })
          }}</span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex flex-col items-center text-sm font-medium">
            <div @click="store.upvoteDeck(store.currentDeck)">
              <ChevronUpIcon
                class="h-6 w-6 cursor-pointer hover:scale-125 hover:text-emerald-500"
                :class="{ 'text-emerald-500': store.currentUserVote === 1 }"
              />
            </div>
            <span class="text-storm-dark">{{ store.currentDeck.votes }}</span>
            <div @click="store.downvoteDeck(store.currentDeck)">
              <ChevronDownIcon
                class="h-6 w-6 cursor-pointer hover:scale-125 hover:text-red-500"
                :class="{ 'text-red-500': store.currentUserVote === -1 }"
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-storm-darkblue hover:bg-storm-blue rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ $t("app.decks.manageButton") }}
          </button>
        </div>
      </div>
    </div>
    <div class="mb-10 p-4 sm:px-6 lg:px-8">
      <h1
        class="text-storm-dark mb-4 text-lg font-medium leading-6 sm:truncate"
      >
        {{ $t("app.decks.cards", { number: store.currentDeck.cards.length }) }}
      </h1>
      <div class="flex items-center justify-center">
        <div
          class="grid flex-1 grid-cols-2 gap-4 p-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        >
          <CreateCard v-slot="{ open }">
            <v-card class="bg-gray-100" @click="open">
              <PlusIcon class="text-storm-dark mx-auto h-full w-12" />
            </v-card>
          </CreateCard>
          <QuestionCard
            v-for="(card, i) in store.currentDeck.cards"
            :key="i"
            :card="card"
            :number="i + 1"
          >
          </QuestionCard>
        </div>
        <div
          class="fixed bottom-0 flex w-full items-center justify-center border-t py-2 backdrop-blur"
        >
          <button
            type="button"
            class="focus:storm-darkblue bg-storm-darkblue rounded-md px-4 py-2 text-sm font-medium text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {{ $t("app.decks.start") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
