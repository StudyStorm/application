<script setup lang="ts">
import { useDecksStore } from "~/store/decks";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline/index.js";
const store = useDecksStore();
const route = useRoute();
import { ref, useFetchAPI } from "#imports";
import { FormError } from "~/types/app";

// TODO: Fetch the deck / Check deck access
store.addUsedDeck(route.params.id as string);

const showModal = ref(true);

const cardTypes = [
  { type: "flashCard", label: "Carte de révision" },
  { type: "optionsCard", label: "Carte à options" },
];

const cardInformation = ref({
  content: {
    question: "",
    answer: "",
    answers: [
      { label: "", isTheAnswer: false },
      { label: "", isTheAnswer: false },
      { label: "", isTheAnswer: false },
      { label: "", isTheAnswer: false },
    ],
    type: "string",
  },
  type: "",
});

async function createCard() {
  const payload = {
    deckId: route.params.id,
    //cardType: cardInformation.value.type,
    content: {
      question: cardInformation.value.content.question,
      type: cardInformation.value.content.type,
    },
  };

  switch (cardInformation.value.type) {
    case cardTypes[0].type:
      payload.content["answer"] = cardInformation.value.content.answer;
      break;
    case cardTypes[1].type:
      payload.content["answers"] = cardInformation.value.content.answers;
      break;
    default:
      return;
  }

  const errors = ref<FormError | null>(null);

  const { data, error } = await useFetchAPI("v1/decks/cards", {
    method: "POST",
    body: {
      ...payload,
    },
  });

  if (error) {
    errors.value = error.data;
    console.log(error.data);
  } else {
    showModal.value = false;
  }
}
</script>

<template>
  <div
    class="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="flex-1 min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        Deck #{{ $route.params.id }}
      </h1>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="flex items-center justify-center w-12 h-12 mx-auto bg-purple-100 rounded-full shrink-0 sm:mx-0 sm:h-10 sm:w-10"
      >
        <SquaresPlusIcon class="w-6 h-6 text-purple-600" aria-hidden="true" />
      </div>
    </template>
    <template #title>
      {{ $t("app.deck.modal.create.title") }}
    </template>
    <template #content>
      <div class="w-full max-w-sm mt-8 space-y-6 px-7 sm:mx-auto sm:w-full">
        <div>
          <label
            for="cardType"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >{{ $t("app.deck.modal.labels.cardType") }}</label
          >
          <div
            v-for="cardType in cardTypes"
            :key="cardType"
            class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              :id="cardType + 'Input'"
              v-model="cardInformation.type"
              type="radio"
              :value="cardType.type"
              :name="cardType + 'bordered-radio'"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
              for="cardType + 'Input'"
              class="w-full py-4 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ cardType.label }}</label
            >
          </div>
        </div>
        <div v-if="cardInformation.type">
          <label for="question" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.question") }}
          </label>
          <div class="mt-1">
            <s-input
              id="question"
              v-model="cardInformation.content.question"
              name="question"
              type="text"
              required
              :placeholder="$t('app.deck.modal.labels.question')"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
            />
          </div>
        </div>
        <div v-if="cardInformation.type === 'flashCard'">
          <label for="answer" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.answer") }}
          </label>
          <div class="mt-1">
            <s-input
              id="answer"
              v-model="cardInformation.content.answer"
              name="answer"
              type="text"
              required
              :placeholder="$t('app.deck.modal.labels.answer')"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
            />
          </div>
        </div>
        <div v-if="cardInformation.type === 'optionsCard'">
          <label for="answers" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.answers") }}
          </label>
          <div
            v-for="index in cardInformation.content.answers.length"
            :key="index"
            class="mt-1"
          >
            <div class="flex">
              <div class="flex items-center mr-4">
                <input
                  :id="'checkbox' + index"
                  v-model="
                    cardInformation.content.answers[index - 1].isTheAnswer
                  "
                  type="checkbox"
                  class="w-4 h-4 mr-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <s-input
                  :id="'answers' + index"
                  :key="index"
                  v-model="cardInformation.content.answers[index - 1].label"
                  :name="'answers' + index"
                  type="text"
                  :placeholder="
                    $t('app.deck.modal.labels.answer') + ' ' + index
                  "
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
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
        class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="createCard"
      >
        {{ $t("app.deck.modal.buttons.create") }}
      </button>
      <button
        type="button"
        class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.deck.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>
