<script setup lang="ts">
import { ref } from "#imports";
import { useDecksStore } from "~/store/decks";
import {
  SquaresPlusIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline/index.js";
const store = useDecksStore();
const route = useRoute();

const showModal = ref(false);

const hasError = ref(false);

const MAX_CARD_ANSWERS = 4;

type Answer = {
  label: string;
  isTheAnswer: boolean;
};

type Card = {
  question: string;
  answers: Answer[];
  type: string;
};

const cardInformation = ref<Card>(null);

function init() {
  hasError.value = false;
  cardInformation.value = {
    question: null,
    answers: [],
    type: "options",
  };
  addAnswer();
  showModal.value = true;
}

async function createCard() {
  if (!cardInformation.value) {
    hasError.value = true;
    return;
  }
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
    await store.fetchDeck(route.params.id as string);
    showModal.value = false;
  }
}

function addAnswer() {
  cardInformation.value?.answers.push({ label: null, isTheAnswer: false });
}

function removeAnswer(answer: Answer) {
  if (cardInformation.value?.answers.length <= 1) {
    return;
  }
  cardInformation.value?.answers.splice(
    cardInformation.value.answers.indexOf(answer),
    1
  );
}
</script>

<template>
  <slot :open="init" />
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
      <div class="mt-8 w-full space-y-4 px-7 sm:px-0 xl:mx-auto">
        <div>
          <label for="question" class="block text-sm font-medium text-gray-700">
            {{ $t("app.deck.modal.labels.question") }}
          </label>
          <s-textarea
            v-model="cardInformation.question"
            required
            :placeholder="$t('app.deck.modal.labels.question')"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
          />
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
        <div class="flex flex-wrap items-center justify-center">
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
        <div class="space-y-5">
          <div v-for="(answer, i) in cardInformation.answers" :key="i">
            <div class="flex items-center justify-between">
              <input
                :id="'checkbox' + i"
                v-model="answer.isTheAnswer"
                type="checkbox"
                class="mr-3 h-6 w-6 rounded border-gray-300 bg-gray-100 text-storm-blue focus:ring-2 focus:ring-storm-blue"
              />
              <s-textarea
                :key="i"
                v-model="answer.label"
                type="text"
                :placeholder="`${$t('app.deck.modal.labels.answer')} ${i + 1}`"
                class="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
              <TrashIcon
                class="ml-3 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"
                aria-hidden="true"
                @click="removeAnswer(answer)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
