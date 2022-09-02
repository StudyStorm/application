<script setup lang="ts">
    import { PropType } from 'vue'

   const card = ref()
   const inputs = ref([])
   const displayRightAnswers = ref(false);

    const props = defineProps({
      question: String,
      answers: Array as PropType<String[]>,
      isTheAnswer: Array as PropType<Boolean[]>,
    });

    for (let i = 0; i < props.answers.length; ++i){
        inputs.value.push(ref('input' + (i + 1)));
    }

    async function sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function resetCard(){
      await card.value.resetCard();
    }

    defineExpose({
      resetCard
    });

    function verifyAnswers() {
      displayRightAnswers.value = true;
      for (let i = 0; i < inputs.value.length; ++i) {
        if (props.isTheAnswer[i]) {

        }
          console.log('here');
      }
    }

</script>

<template>
  <Card ref="card" :isFlippable="false">
    <template #cardFront>
      <div class="grid grid-rows-1 space-y-6 items-center" style="margin-left: auto; margin-right: auto;">
        <div class="text-center font-medium ">
          <h1 class="text-gray-600 ">
            {{ question }}
          </h1>
        </div>
        <div class="">
          <ul class="grid gap-2 w-full md:grid-cols-2">
            <li v-for="i in answers.length">
                <input :disabled="displayRightAnswers" type="checkbox" :ref="inputs[i]" :key="i" :id="'input' + i" :value="answers[i - 1]" class="hidden peer">
                <label :for="'input' + i" v-bind:class="[{'peer-checked:border-blue-600': !displayRightAnswers}, {'peer-checked:border-green-600': displayRightAnswers && isTheAnswer[i - 1]}, {'bg-green-200 hover:bg-green-200': displayRightAnswers && isTheAnswer[i - 1]}, {'hover:bg-gray-200': !displayRightAnswers}, {'peer-checked:border-red-600': displayRightAnswers && !isTheAnswer[i - 1]}]" class="inline-flex items-center justify-center p-3 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                    <div class="block">
                        <div class="w-full text-sm">{{ answers[i - 1] }}</div>
                    </div>
                </label>
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            @click="verifyAnswers"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
    margin-left:auto;
    margin-right:auto;
  }
</style>