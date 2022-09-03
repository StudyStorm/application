<script setup lang="ts">
import { PropType } from "vue";

const card = ref();
const inputs = ref([]);
const displayRightAnswers = ref(false);

const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array<string>,
    required: true,
  },
});

// for (let i = 0; i < props.answers.length; ++i) {
//   inputs.value.push(ref("input" + (i + 1)));
// }

// async function resetCard() {
//   await card.value.resetCard();
// }

// defineExpose({
//   resetCard,
// });
</script>

<template>
  <Card ref="card" :is-flippable="false">
    <template #cardFront>
      <div
        class="grid grid-rows-1 items-center space-y-6"
        style="margin-left: auto; margin-right: auto"
      >
        <div class="text-center font-medium">
          <h1 class="text-gray-600">
            {{ question }}
          </h1>
        </div>
        <div>
          <ul class="grid w-full gap-2 md:grid-cols-2">
            <!-- <li v-for="i in answers.length" :key="i">
              <input
                :id="'input' + i"
                :ref="inputs[i]"
                :key="i"
                :disabled="displayRightAnswers"
                type="checkbox"
                :value="answers[i - 1]"
                class="peer hidden"
              />
              <label
                :for="'input' + i"
                :class="[
                  { 'peer-checked:border-purple-600': !displayRightAnswers },
                  {
                    'peer-checked:border-green-600':
                      displayRightAnswers && isTheAnswer[i - 1],
                  },
                  {
                    'bg-green-200 hover:bg-green-200 border-red-600':
                      displayRightAnswers && isTheAnswer[i - 1],
                  },
                  { 'hover:bg-gray-200': !displayRightAnswers },
                  {
                    'peer-checked:border-red-600':
                      displayRightAnswers && !isTheAnswer[i - 1],
                  },
                ]"
                class="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-3 text-gray-500 hover:text-gray-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
              >
                <div class="block">
                  <div class="w-full text-sm">{{ answers[i - 1] }}</div>
                </div>
              </label>
            </li> -->
          </ul>
        </div>
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
    </template>
  </Card>
</template>

<style scoped>
.cardText {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-left: auto;
  margin-right: auto;
}
</style>
