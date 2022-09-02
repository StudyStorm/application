<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
} from "@heroicons/vue/24/outline/index.js";

const err = ref<null | any>(null);
const showModal = ref(false);

const deck = {
  id: "01013eab-bbcc-4037-ae99-a08efb2a921b",
  name: "Random deck",
  creator: {
    firstname: "John",
    lastname: "Doe",
  },
  cards: [
    {
      id: "a8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question: "What is the capital of switzerland?",
        answer: "Bern",
        type: "string",
      },
      type: "flashCard",
    },
    {
      id: "b8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question: "Where am I ?",
        answers: [
          { label: "I am here", isTheAnswer: true },
          { label: "I am not here", isTheAnswer: false },
          { label: "I am maybe here", isTheAnswer: false },
          { label: "Working", isTheAnswer: true },
        ],
        type: "string",
      },
      type: "options",
    },
    {
      id: "c8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question:
          "Quelle(s) déclaration(s) C correspond(ent) à l'énoncé suivant ? t est un tableau de 10 pointeurs pointant chacun sur un int constant",
        answers: [
          { label: "const int* t[10]", isTheAnswer: true },
          { label: "int* const t[10]", isTheAnswer: false },
          { label: "const int* t[10]", isTheAnswer: false },
          { label: "int** const t[10]", isTheAnswer: false },
        ],
        type: "string",
      },
      type: "options",
    },
    {
      id: "d8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question: "What is the capital of Germany?",
        answer: "Berlin",
        type: "string",
      },
      type: "flashCard",
    },
    {
      id: "e8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question: "What is the capital of France?",
        answer: "Paris",
        type: "string",
      },
      type: "flashCard",
    },
    {
      id: "f8a7c042-d537-45c4-b3da-ac1c20c0bae7",
      content: {
        question: "What is the capital of the United Stated of America?",
        answer: "Washington DC",
        type: "string",
      },
      type: "flashCard",
    },
  ],
};

const cardIndex = ref(0);
const card = ref();
const progressBar = ref();
const cardNumberProgression = ref();
const nextCardButton = ref();
const previousCardButton = ref();
const signalMessage = ref("");

function updateProgressBar() {
  progressBar.value.style.width =
    100 * (cardIndex.value / (deck.cards.length - 1)) + "%";
  cardNumberProgression.value.innerText =
    String(cardIndex.value + 1) + " / " + String(deck.cards.length);
}

async function previousCard() {
  if (cardIndex.value) {
    previousCardButton.value.style.disabled = false;
    // If card is flipped, flip card without showing the previous card answer
    await card.value.resetCard();
    --cardIndex.value;
    updateProgressBar();
  } else {
    previousCardButton.value.style.disabled = true;
  }
}

async function nextCard() {
  if (cardIndex.value < deck.cards.length - 1) {
    nextCardButton.value.style.disabled = false;
    // If card is flipped, flip card without showing the next card answer
    await card.value.resetCard();
    ++cardIndex.value;
    updateProgressBar();
  } else {
    nextCardButton.value.style.disabled = true;
  }
}

async function signalCard() {
  const signalCardID = deck.cards[cardIndex.value].id;
  console.log(
    "Signal card with ID: " +
      signalCardID +
      " with message " +
      signalMessage.value
  );

  // Clear input and hide modal
  signalMessage.value = "";
  showModal.value = false;
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div
    class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {{ deck.name }}
        <span class="font-small text-sm leading-6 text-gray-900 sm:truncate">
          {{ $t("app.learn.text.by") }}
          {{ deck.creator.firstname + " " + deck.creator.lastname }}
        </span>
      </h1>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
      <div class="mb-1 flex justify-between">
        <span
          class="text-base font-medium text-blue-700 dark:text-white"
        ></span>
        <span
          ref="cardNumberProgression"
          class="text-sm font-medium text-purple-600 dark:text-white"
          >1 / {{ deck.cards.length }}</span
        >
      </div>
      <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          ref="progressBar"
          class="h-2.5 rounded-full bg-purple-600 dark:bg-purple-500"
          style="width: 0%"
        ></div>
      </div>
      <FlashCard
        v-if="deck.cards[cardIndex].type === 'flashCard'"
        ref="card"
        :key="cardIndex"
        :question="deck.cards[cardIndex].content.question"
        :answer="deck.cards[cardIndex].content.answer"
      ></FlashCard>
      <OptionsCard
        v-if="deck.cards[cardIndex].type === 'options'"
        ref="card"
        :key="cardIndex"
        :question="deck.cards[cardIndex].content.question"
        :answers="
          deck.cards[cardIndex].content.answers.map((answer) => {
            return answer.label;
          })
        "
        :is-the-answer="
          deck.cards[cardIndex].content.answers.map((answer) => {
            return answer.isTheAnswer;
          })
        "
      ></OptionsCard>
      <div
        class="flex flex-col"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div class="inline-flex">
          <button
            ref="previousCardButton"
            class="rounded-l bg-gray-300 p-4 font-bold text-gray-800 hover:bg-gray-400"
            @click="previousCard"
          >
            <ChevronLeftIcon class="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            ref="nextCardButton"
            class="rounded-r bg-gray-300 p-4 font-bold text-gray-800 hover:bg-gray-400"
            @click="nextCard"
          >
            <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="space-y-6 bg-white px-4 py-8 sm:rounded-lg sm:px-10">
      <div>
        <button
          type="button"
          class="hover:bg-grey-600 flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          @click="showModal = true"
        >
          {{ $t("app.learn.buttons.signal") }}
        </button>
      </div>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <FlagIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
    </template>
    <template #title>
      {{ $t("app.learn.modal.title") }}
    </template>
    <template #content>
      <div class="mb-6">
        <label
          for="message"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ $t("app.learn.modal.message") }}</label
        >
        <input
          id="message"
          v-model="signalMessage"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="signalCard"
      >
        {{ $t("app.learn.modal.buttons.confirmSignal") }}
      </button>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.learn.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>
