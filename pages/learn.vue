<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline/index.js";
import { useLearnStore } from "~~/store/learn";
import ReportCardModal from "~/components/ReportCardModal.vue";
import { SwipeDirection } from "@vueuse/core";

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

const activeCard = ref(null);

const { isSwiping, lengthX, lengthY } = useSwipe(activeCard, {
  onSwipeEnd(_e: TouchEvent, direction: SwipeDirection) {
    switch (direction) {
      case "LEFT":
        learnStore.previousCard();
        break;
      case "RIGHT":
        learnStore.nextCard();
        break;
    }
  },
});

const transform = computed(() => {
  if (!isSwiping.value) return undefined;
  const x = -lengthX.value;
  const y = -lengthY.value;
  const xMulti = x * 0.03;
  const yMulti = y / 80;
  const rotate = xMulti * yMulti;
  return `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
});

const previousCard = () => {
  learnStore.previousCard();
  activeCard.value.reset();
};

const nextCard = () => {
  learnStore.nextCard();
  activeCard.value.reset();
};

// TODO: flip card when going to the next if needed
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {{ learnStore.deck.name }}
          <span class="text-sm leading-6 text-gray-900 sm:truncate">
            {{
              $t("app.learn.text.by", {
                author: `${learnStore.deck.creator.first_name} ${learnStore.deck.creator.last_name}`,
              })
            }}
          </span>
        </h1>
      </div>
    </div>
    <div class="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div class="rounded-lg bg-white p-4">
        <div class="mb-1 flex justify-between">
          <span
            class="text-base font-medium text-blue-700 dark:text-white"
          ></span>
          <span class="text-sm font-medium text-purple-600 dark:text-white"
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
          ref="activeCard"
          :card="learnStore.currentCard"
          :class="{ 'transition-transform': !isSwiping }"
          :style="{ transform }"
        />

        <div class="mt-8 flex flex-col items-center justify-center">
          <div class="inline-flex">
            <button
              class="rounded-l p-4 font-bold text-storm-dark shadow hover:bg-gray-100"
              :disabled="!learnStore.canGoBack"
              :class="{
                'cursor-not-allowed bg-gray-300 hover:bg-gray-300':
                  !learnStore.canGoBack,
              }"
              @click="previousCard"
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
              @click="nextCard"
            >
              <ChevronRightIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full max-w-md">
      <div class="space-y-6 bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <div>
          <ReportCardModal v-slot="{ open }">
            <button
              type="button"
              class="flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              @click="open"
            >
              {{ $t("app.learn.buttons.signal") }}
            </button>
          </ReportCardModal>
        </div>
      </div>
    </div>
  </div>
</template>
