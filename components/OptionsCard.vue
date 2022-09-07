<script setup lang="ts">
import Card from "~/models/Card";

const displayRightAnswers = ref(false);

const props = defineProps<{
  card: Card;
}>();

const question = computed(() => {
  return props.card.content.question;
});

const answers = computed(() => {
  return props.card.content.answers;
});

const answerStyle = computed(() => (isTheAnswer: boolean) => {
  if (!displayRightAnswers.value) {
    return "peer-checked:border-purple-600 hover:bg-gray-200";
  }

  if (isTheAnswer) {
    return "peer-checked:border-green-600 bg-green-200 hover:bg-green-200 border-red-600 animate-pulse scale-105 bold";
  } else {
    return "peer-checked:border-red-600";
  }
});

const reset = () => {
  displayRightAnswers.value = false;
};

defineExpose({
  reset,
});
</script>

<template>
  <FlippableCard :is-flippable="false">
    <div
      class="flex h-full flex-col items-center justify-between p-6"
      style="margin-left: auto; margin-right: auto"
    >
      <div class="text-center font-medium">
        <h1 class="text-gray-600">
          {{ question }}
        </h1>
      </div>
      <ul class="grid w-full gap-2 md:grid-cols-2">
        <li v-for="(answer, i) in answers" :key="i">
          <input
            :id="`input${i}`"
            :disabled="displayRightAnswers"
            type="checkbox"
            class="peer hidden"
          />
          <label
            :for="`input${i}`"
            :class="answerStyle(answer.isTheAnswer)"
            class="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-3 text-gray-500 hover:text-gray-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
          >
            <div class="block">
              <div class="w-full text-sm">{{ answer.label }}</div>
            </div>
          </label>
        </li>
      </ul>
      <div class="w-40" style="margin-left: auto; margin-right: auto">
        <button
          type="button"
          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="displayRightAnswers = true"
        >
          {{ $t("app.learn.buttons.checkAnswer") }}
        </button>
      </div>
    </div>
  </FlippableCard>
</template>
