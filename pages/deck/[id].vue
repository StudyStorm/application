<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid/index.js";
import { useDecksStore } from "~/store/decks";

const store = useDecksStore();
const route = useRoute();
await store.fetchDeck(route.params.id as string);

onMounted(() => {
  store.addUsedDeck(route.params.id as string);
});

const createCard = () => {
  console.log("created card");
};
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="flex min-w-0 flex-1 items-center justify-between">
        <div>
          <h1
            class="flex-row text-lg font-medium leading-6 text-storm-dark sm:truncate"
          >
            {{ store.currentDeck.name }}
          </h1>
          <span class="text-sm text-storm-dark sm:truncate">{{
            $t("app.decks.createdBy", {
              name: `${store.currentDeck.creator.first_name} ${store.currentDeck.creator.last_name}`,
            })
          }}</span>
        </div>

        <div>
          <button
            type="submit"
            class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ $t("app.decks.manageButton") }}
          </button>
        </div>
      </div>
    </div>
    <div class="mb-10 p-4 sm:px-6 lg:px-8">
      <h1
        class="mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.decks.cards", { number: store.currentDeck.cards.length }) }}
      </h1>
      <div class="flex items-center justify-center">
        <div
          class="grid grid-cols-2 gap-4 p-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5"
        >
          <div
            class="block cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 text-center shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
          >
            <PlusIcon class="text-storm-dark sm:p-10" />
          </div>
          <QuestionCard
            v-for="(card, i) in store.currentDeck.cards"
            :key="i"
            :card="card"
            :number="i + 1"
            class="aspect-w-1 aspect-h-1 block cursor-pointer rounded-lg border border-gray-200 bg-gray-50 text-center shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
          >
          </QuestionCard>
        </div>
        <div
          class="fixed bottom-0 flex w-full items-center justify-center border-t py-2 backdrop-blur"
        >
          <button
            type="button"
            class="focus:storm-darkblue rounded-md bg-storm-darkblue px-4 py-2 text-sm font-medium text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {{ $t("app.decks.start") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
