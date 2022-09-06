<script setup lang="ts">
import { ref } from "#imports";
import { useDecksStore } from "~/store/decks";
import { PlusIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/vue/24/outline/index.js";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid/index.js";
const store = useDecksStore();
const route = useRoute();
await store.fetchDeck(route.params.id as string);
await store.fetchDeckUserRating(route.params.id as string);

onMounted(async () => {
  store.addUsedDeck(route.params.id as string);
});

const showModal = ref(true);

const hasError = ref(false);

const MAX_CARD_ANSWERS = 4;

const cardInformation = ref({
  question: null,
  answers: [{ label: null, isTheAnswer: false }],
  type: "options",
});

async function createCard() {
  const payload = {
    deckId: route.params.id as string,
    content: {
      question: cardInformation.value.question,
      answers: [],
      type: cardInformation.value.type,
    },
  };

  payload.content.answers = cardInformation.value.answers.filter(
    (answer) => answer.label !== null
  );

  if (!payload.content.answers.length) {
    hasError.value = true;
    return;
  }

  if (payload.content.answers.length === 1) {
    payload.content.answers[0].isTheAnswer = true;
    payload.content.type = "flashCard";
  }

  const { error } = await store.createCard(payload);

  if (error) {
    hasError.value = true;
  } else {
    showModal.value = false;
  }
}

function addAnswer() {
  cardInformation.value.answers.push({ label: null, isTheAnswer: false });
}
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
          class="grid grid-cols-2 gap-4 p-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        >
          <div
            class="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-center shadow-md backdrop-blur transition hover:scale-105 hover:bg-gray-100"
          >
            <PlusIcon class="mx-auto h-full w-12 text-storm-dark" />
          </div>
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
            class="focus:storm-darkblue rounded-md bg-storm-darkblue px-4 py-2 text-sm font-medium text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {{ $t("app.decks.start") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <SquaresPlusIcon class="h-6 w-6 text-purple-600" aria-hidden="true" />
      </div>
    </template>
    <template #title>
      {{ $t("app.deck.modal.create.title") }}
    </template>
    <template #content>
      <div class="mt-8 w-full max-w-sm space-y-6 px-7 sm:mx-auto sm:w-full">
        <div>
          <label for="question" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.question") }}
          </label>
          <div class="mt-1">
            <s-input
              id="question"
              v-model="cardInformation.question"
              name="question"
              type="text"
              required
              :placeholder="$t('app.deck.modal.labels.question')"
              class="focus:border-storm-blue focus:ring-storm-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div
          v-if="hasError"
          class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span class="block sm:inline">{{
            $t("app.deck.modal.labels.error")
          }}</span>
          <span
            class="absolute inset-y-0 right-0 cursor-pointer px-4 py-3"
            @click="hasError = false"
          >
            <XMarkIcon
              class="h-5 w-5 text-red-600"
              aria-hidden="true"
            ></XMarkIcon>
          </span>
        </div>
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-center space-y-2">
            <label
              for="answers"
              class="m-auto block text-sm font-medium text-gray-700"
            >
              {{ $t("app.deck.modal.labels.answers") }}
            </label>
            <button
              v-if="cardInformation.answers.length < MAX_CARD_ANSWERS"
              class="ml-2 rounded bg-blue-100 py-2 px-4 font-bold hover:border-gray-600 hover:bg-blue-100"
              @click="addAnswer"
            >
              {{ $t("app.deck.modal.buttons.addAnswer") }}
            </button>
          </div>
          <div
            v-for="(answer, i) in cardInformation.answers"
            :key="i"
            class="mt-1"
          >
            <div class="flex">
              <div class="mr-4 flex items-center">
                <input
                  :id="'checkbox' + i"
                  v-model="answer.isTheAnswer"
                  type="checkbox"
                  class="mr-6 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <s-input
                  :id="'answers' + i"
                  :key="i"
                  v-model="answer.label"
                  :name="'answers' + i"
                  type="text"
                  :placeholder="`${$t('app.deck.modal.labels.answer')} ${
                    i + 1
                  }`"
                  class="focus:border-storm-blue focus:ring-storm-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="bg-storm-darkblue hover:bg-storm-blue inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="createCard"
      >
        {{ $t("app.deck.modal.buttons.create") }}
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.deck.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>
