<script setup lang="ts">
import { ref } from "#imports";
import { useDecksStore } from "~/store/decks";
import { SquaresPlusIcon, XMarkIcon } from "@heroicons/vue/24/outline/index.js";
const store = useDecksStore();
const route = useRoute();

onMounted(() => {
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
