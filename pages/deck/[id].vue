<script setup lang="ts">
import { useDecksStore } from "~/store/decks";
import { PlusIcon } from "@heroicons/vue/24/outline/index.js";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid/index.js";
import SCardSquared from "~/components/s/SCardSquared.vue";
import Classroom from "~~/models/Classroom";

const store = useDecksStore();
const route = useRoute();
const router = useRouter();

await store.fetchDeck(route.params.id as string);
await store.fetchDeckUserRating(route.params.id as string);

const { data: permissionClassroom } = await useFetchAPI<Classroom>(
  `/v1/classrooms/${store.currentDeck.folder.classroom_id}`,
  {
    method: "GET",
  }
);

const deleteDeck = async () => {
  await store.deleteDeck(store.currentDeck.id);
  router.push({ name: "dashboard" });
};

onMounted(async () => {
  store.addUsedDeck(route.params.id as string);
  await store.fetchLastVisited();
});
</script>

<template>
  <div>
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
                  class="h-6 w-6 cursor-pointer hover:scale-125 hover:text-storm-red"
                  :class="{ 'text-storm-red': store.currentUserVote === -1 }"
                />
              </div>
            </div>
            <update-deck-modal v-slot="{ open }">
              <button
                v-if="permissionClassroom.permissions.write"
                type="submit"
                class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="open"
              >
                {{ $t("app.decks.manageButton") }}
              </button>
            </update-deck-modal>
            <confirm-modal
              v-if="permissionClassroom.permissions.delete"
              @confirm="deleteDeck"
            >
              <template #title>
                {{ $t("app.deck.modal.delete.title") }}
              </template>
              <template #content>
                {{ $t("app.deck.modal.delete.content") }}
              </template>
              <template #default="{ open }">
                <button
                  type="button"
                  class="rounded-md border border-transparent bg-storm-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  @click="open"
                >
                  {{ $t("app.deck.modal.buttons.delete") }}
                </button>
              </template>
            </confirm-modal>
          </div>
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
          class="grid flex-1 grid-cols-2 gap-4 p-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        >
          <create-card-modal
            v-if="permissionClassroom.permissions.write"
            v-slot="{ open }"
          >
            <s-card-squared class="bg-gray-100" @click="open">
              <PlusIcon class="mx-auto h-full w-12 text-storm-dark" />
            </s-card-squared>
          </create-card-modal>

          <QuestionCard
            v-for="(card, i) in store.currentDeck.cards"
            :key="i"
            :card="card"
            :number="i + 1"
            :can-delete="permissionClassroom.permissions.delete"
            :can-edit="permissionClassroom.permissions.write"
          />
        </div>
        <div
          v-if="store.currentDeck.cards.length"
          class="fixed bottom-0 flex w-full items-center justify-center border-t py-6 backdrop-blur"
        >
          <NuxtLink
            type="button"
            class="focus:storm-darkblue rounded-md bg-storm-darkblue p-4 text-sm font-medium text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
            :to="{
              name: 'learn-id',
              params: {
                id: store.currentDeck.id,
              },
            }"
          >
            {{ $t("app.decks.start") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
