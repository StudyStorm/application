<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline/index.js";
import { useLearnStore } from "~~/store/learn";
import ReportCardModal from "~/components/ReportCardModal.vue";
import { onKeyStroke, SwipeDirection } from "@vueuse/core";
import { useRouter } from "vue-router";

const learnStore = useLearnStore();
const route = useRoute();

await learnStore.fetchDeck(route.params.id as string);

const router = useRouter();

if (!learnStore.deck.cards.length) {
  router.push(`/deck/${route.params.id}`);
}

const cardType = computed(() => {
  return learnStore.currentCard.content.answers.length > 1
    ? resolveComponent("OptionsCard")
    : resolveComponent("FlashCard");
});

const progress = computed(() => {
  return ((learnStore.currentStep - 1) / (learnStore.numberOfCards - 1)) * 100;
});

const activeCard = ref(null);

const { isSwiping } = useSwipe(activeCard, {
  onSwipeEnd(_e: TouchEvent, direction: SwipeDirection) {
    switch (direction) {
      case "LEFT":
        nextCard();
        break;
      case "RIGHT":
        previousCard();
        break;
    }
  },
});

onKeyStroke("ArrowLeft", (e) => {
  if ((e.target as HTMLElement).localName !== "body") return;
  e.preventDefault();
  if (e.repeat) return;
  previousCard();
});

onKeyStroke("ArrowRight", (e) => {
  if ((e.target as HTMLElement).localName !== "body") return;
  e.preventDefault();
  if (e.repeat) return;
  nextCard();
});

onKeyStroke(" ", (e) => {
  if ((e.target as HTMLElement).localName !== "body") return;
  e.preventDefault();
  if (e.repeat) return;
  activeCard.value.toggle?.();
});

const swipeTransition = ref<string>("");

const previousCard = () => {
  learnStore.previousCard();
  activeCard.value.reset();
  swipeTransition.value = "swipe-left";
};

const nextCard = () => {
  learnStore.nextCard();
  activeCard.value.reset();
  swipeTransition.value = "swipe-right";
};
</script>

<template>
  <div class="overflow-x-hidden">
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="flex w-full min-w-0 items-center justify-between">
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
        <NuxtLink
          :to="{
            name: 'deck-id',
            params: {
              id: learnStore.deck.id,
            },
          }"
        >
          <XMarkIcon class="h-8" />
        </NuxtLink>
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
        <div class="relative">
          <Transition :name="swipeTransition">
            <component
              :is="cardType"
              ref="activeCard"
              :key="learnStore.currentCard.id"
              :card="learnStore.currentCard"
              :class="{ 'transition-transform': !isSwiping }"
            />
          </Transition>
        </div>

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
      <div class="space-y-6 bg-white p-4 sm:rounded-lg sm:px-10">
        <div>
          <ReportCardModal v-slot="{ open }">
            <button
              type="button"
              class="flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:border-transparent focus:outline-none focus:ring-2 focus:ring-storm-red focus:ring-offset-2"
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

<style scoped>
.swipe-right-enter-active,
.swipe-left-enter-active {
  transition: all 0.5s;
  z-index: 1;
}
.swipe-right-leave-active,
.swipe-left-leave-active {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: 10;
}
.swipe-right-enter-from,
.swipe-left-enter-from {
  transform: scale(0.5);
  opacity: 0;
}
.swipe-right-leave-to {
  transform: translate(-100vh, -100px) rotate(-30deg) scale(0.5);
  opacity: 0;
}
.swipe-left-leave-to {
  transform: translate(100vh, -100px) rotate(-30deg) scale(0.5);
  opacity: 0;
}
</style>
