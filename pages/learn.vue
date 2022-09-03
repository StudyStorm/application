import { useLearnStore } from '../store/learn';
<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
} from "@heroicons/vue/24/outline/index.js";
import { useLearnStore } from "~~/store/learn";

const learnStore = useLearnStore();

// TODO: fetch the real deck id
await learnStore.fetchDeck(1);

const cardTypes = {
  flashCard: resolveComponent("FlashCard"),
  options: resolveComponent("OptionsCard"),
};

const progress = computed(() => {
  return (learnStore.currentStep / learnStore.numberOfCards) * 100;
});

// const showModal = ref(false);

// TODO call store to fetch deck id

// const cardIndex = ref(0);
// const card = ref();
// const progressBar = ref();
// const cardNumberProgression = ref();
// const nextCardButton = ref();
// const previousCardButton = ref();
// const signalMessage = ref("");

// function updateProgressBar() {
//   progressBar.value.style.width =
//     100 * (cardIndex.value / (deck.cards.length - 1)) + "%";
//   cardNumberProgression.value.innerText =
//     String(cardIndex.value + 1) + " / " + String(deck.cards.length);
// }

// async function previousCard() {
//   if (cardIndex.value) {
//     previousCardButton.value.style.disabled = false;
//     // If card is flipped, flip card without showing the previous card answer
//     await card.value.resetCard();
//     --cardIndex.value;
//     updateProgressBar();
//   } else {
//     previousCardButton.value.style.disabled = true;
//   }
// }

// async function nextCard() {
//   if (cardIndex.value < deck.cards.length - 1) {
//     nextCardButton.value.style.disabled = false;
//     // If card is flipped, flip card without showing the next card answer
//     await card.value.resetCard();
//     ++cardIndex.value;
//     updateProgressBar();
//   } else {
//     nextCardButton.value.style.disabled = true;
//   }
// }

// async function signalCard() {
//   const signalCardID = deck.cards[cardIndex.value].id;
//   console.log(
//     "Signal card with ID: " +
//       signalCardID +
//       " with message " +
//       signalMessage.value
//   );

//   // Clear input and hide modal
//   signalMessage.value = "";
//   showModal.value = false;
// }
</script>

<template>
  <div
    class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {{ learnStore.deck.name }}
        <span class="text-sm leading-6 text-gray-900 sm:truncate">
          {{
            $t("app.learn.text.by", {
              author: learnStore.deck.creator.fullname,
            })
          }}
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
          >{{ learnStore.currentStep }} / {{ learnStore.numberOfCards }}</span
        >
      </div>
      <div class="mb-4 h-2.5 w-full rounded-full bg-gray-200">
        <div
          class="h-2.5 rounded-full bg-gradient-to-r from-storm-grad-left to-storm-grad-right"
          :style="`width: ${progress}%; transition: 0.5s ease-in-out`"
        ></div>
      </div>

      <component
        :is="cardTypes[learnStore.currentCard.content.type]"
        :question="learnStore.currentCard.content.question"
        :answers="learnStore.currentCard.content.answers"
      />

      <!-- <FlashCard
        v-if="deck.cards[cardIndex].type === 'flashCard'"
        ref="card"
        :key="cardIndex"
        :question="deck.cards[cardIndex].content.question"
        :answer="deck.cards[cardIndex].content.answer"
      ></FlashCard> -->
      <!-- <OptionsCard
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
      ></OptionsCard> -->
      <div
        class="mt-8 flex flex-col"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div class="inline-flex">
          <button
            ref="previousCardButton"
            class="rounded-l p-4 font-bold text-storm-dark shadow hover:bg-gray-100"
            :disabled="!learnStore.canGoBack"
            :class="{
              'cursor-not-allowed bg-gray-300 hover:bg-gray-300':
                !learnStore.canGoBack,
            }"
            @click="learnStore.previousCard"
          >
            <ChevronLeftIcon class="h-6 w-6" />
          </button>
          <button
            class="rounded-r p-4 font-bold text-storm-dark shadow hover:bg-gray-100"
            :disabled="!learnStore.canGoForward"
            :class="{
              'cursor-not-allowed bg-gray-300 hover:bg-gray-300':
                !learnStore.canGoForward,
            }"
            @click="learnStore.nextCard"
          >
            <ChevronRightIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="space-y-6 bg-white px-4 py-8 sm:rounded-lg sm:px-10">
      <div>
        <!-- <button
          type="button"
          class="flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          @click="showModal = true"
        >
          {{ $t("app.learn.buttons.signal") }}
        </button> -->
      </div>
    </div>
  </div>
  <!-- <Modal v-model="showModal">
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
  </Modal> -->
</template>
