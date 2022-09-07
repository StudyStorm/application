<script setup lang="ts">
import { ChevronRightIcon, Bars4Icon } from "@heroicons/vue/24/solid/index.js";
import { useDecksStore } from "~/store/decks";
import { Square2StackIcon } from "@heroicons/vue/24/outline/index.js";

const deckStore = useDecksStore();
await deckStore.fetchDecks();
await deckStore.fetchAllDecks();
await deckStore.fetchBestDecks();

const displayStyle = ref("row");

const tableHeaders = ["Deck name", "Author", "Votes"];

const currentPage = ref(deckStore.pagination.current_page);

const changePage = (page: number) => {
  if (page > 0 && page <= deckStore.pagination.last_page) {
    currentPage.value = page;
    deckStore.fetchDecks(currentPage.value);
  }
};
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-storm-dark sm:truncate">
          {{ $t("app.dashboard.title") }}
        </h1>
      </div>
    </div>
    <div class="p-4 sm:px-6 lg:px-8">
      <h1
        class="mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.dashboard.topDecks") }}
      </h1>

      <div class="s-grid">
        <DeckCard
          v-for="deck in deckStore.bestRatedDecks"
          :key="deck.id"
          :deck="deck"
        />
      </div>

      <h1
        class="mt-8 mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.dashboard.recentDecks") }}
      </h1>

      <div class="s-grid">
        <ClientOnly>
          <DeckCard
            v-for="deck in deckStore.lastUsedDecks"
            :key="deck.id"
            :deck="deck"
          />
        </ClientOnly>
      </div>

      <h1
        class="mt-8 mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.dashboard.browseDecks") }}
      </h1>

      <div class="flex items-center justify-between">
        <div>
          <input
            v-model="deckStore.searchFilter"
            name="searchDeck"
            type="text"
            class="block w-40 flex-auto rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-80 sm:text-sm md:w-96"
            placeholder="Search decks"
            @input="changePage(currentPage)"
          />
        </div>

        <div
          class="flex cursor-pointer divide-x-2 rounded-sm border text-storm-dark"
        >
          <span
            class="p-2 hover:scale-110"
            :class="{ 'bg-gray-200': displayStyle === 'row' }"
            @click="displayStyle = 'row'"
          >
            <Bars4Icon class="h-5 w-5"
          /></span>
          <span
            class="p-2 hover:scale-110"
            :class="{ 'bg-gray-200': displayStyle === 'card' }"
            @click="displayStyle = 'card'"
            ><Square2StackIcon class="h-5 w-5"
          /></span>
        </div>
      </div>

      <!-- Projects list (mobile) -->
      <div class="mt-10 sm:hidden">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-storm-dark">Projects</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="deck in deckStore.decks" :key="deck.id">
            <NuxtLink
              :to="{
                name: 'deck-id',
                params: {
                  id: deck.id,
                },
              }"
              class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span class="truncate text-sm font-medium leading-6">
                  {{ deck.name }}
                </span>
              </span>
              <ChevronRightIcon
                class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Projects table (desktop) -->
      <div class="mt-8 hidden sm:block">
        <div
          v-if="displayStyle === 'row'"
          class="inline-block min-w-full border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr class="border-t border-gray-200">
                <th
                  v-for="(header, i) in tableHeaders"
                  :key="i"
                  class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span class="lg:pl-2">{{ header }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(deck, i) in deckStore.decks"
                :key="deck.id"
                :class="{ 'bg-gray-100': i % 2 === 0 }"
              >
                <td class="whitespace-nowrap px-6 py-3 text-sm font-medium">
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <NuxtLink
                      :to="{
                        name: 'deck-id',
                        params: {
                          id: deck.id,
                        },
                      }"
                      class="truncate hover:text-gray-600"
                    >
                      <span>
                        {{ deck.name }}
                      </span>
                    </NuxtLink>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <span class="truncate hover:text-gray-600">
                      <span>
                        {{ deck.creator.first_name }}
                        {{ deck.creator.last_name }}
                      </span>
                    </span>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <span class="truncate hover:text-gray-600">
                      <span>
                        {{ deck.votes }}
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            <DeckCard
              v-for="deck in deckStore.decks"
              :key="deck.id"
              :deck="deck"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-center">
          <s-paginator
            :current-page="currentPage"
            :last="deckStore.pagination.last_page"
            :max-visible="5"
            @change-page="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
