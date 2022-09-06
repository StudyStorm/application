<script setup lang="ts">
import { useDecksStore } from "~/store/decks";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline/index.js";
const store = useDecksStore();
const route = useRoute();
import { ref, useFetchAPI } from "#imports";

onMounted(() => {
  store.addUsedDeck(route.params.id as string);
});

const showModal = ref(true);

const cardInformation = ref({
  content: {
    question: null,
    answers: [
      { label: null, isTheAnswer: false },
      { label: null, isTheAnswer: false },
      { label: null, isTheAnswer: false },
      { label: null, isTheAnswer: false },
    ],
    type: "string",
  },
});

async function createCard() {
  const payload = {
    deckId: route.params.id,
    content: {
      question: cardInformation.value.content.question,
      answers: [],
      type: cardInformation.value.content.type,
    },
  };

  for (const answer of cardInformation.value.content.answers) {
    if (answer.label !== null) {
      payload.content.answers.push(answer);
    }
  }

  if (payload.content.answers.length === 1) {
    payload.content.answers[0].isTheAnswer = true;
  }

  const { error } = await useFetchAPI("v1/decks/cards", {
    method: "POST",
    body: {
      ...payload,
    },
  });

  if (error) {
    console.log(error.data);
  } else {
    showModal.value = false;
  }
}
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Deck #{{ $route.params.id }}
        </h1>
      </div>
    </div>
    <div>
      {{ store.currentDeck }}
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
              v-model="cardInformation.content.question"
              name="question"
              type="text"
              required
              :placeholder="$t('app.deck.modal.labels.question')"
              class="focus:border-storm-blue focus:ring-storm-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="answers" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.answers") }}
          </label>
          <div
            v-for="index in cardInformation.content.answers.length"
            :key="index"
            class="mt-1"
          >
            <div class="flex">
              <div class="mr-4 flex items-center">
                <input
                  :id="'checkbox' + index"
                  v-model="
                    cardInformation.content.answers[index - 1].isTheAnswer
                  "
                  type="checkbox"
                  class="mr-6 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
