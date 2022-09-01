<script setup lang="ts">
    import { PropType } from 'vue'

   const card = ref()

    const props = defineProps({
      question: String,
      answers: Array as PropType<String[]>,
    });

    console.log(props.answers);


    async function sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function resetCard(){
      await card.value.resetCard();
    }

    defineExpose({
      resetCard
    });

</script>

<template>
  <Card ref="card" :isFlippable="false">
    <template #cardFront>
      <div class="grid grid-rows-1 space-y-6 items-center" style="margin-left: auto; margin-right: auto;">
        <div class="text-center">
          <h1 class="cardText">
            {{ question }}
          </h1>
        </div>
        <div class="">
          <ul class="grid gap-2 w-full md:grid-cols-2">
            <li v-for="i in answers.length">
                <input type="checkbox" :id="'input' + i" :value="answers[i - 1]" class="hidden peer">
                <label :for="'input' + i" class="inline-flex items-center justify-center p-3 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
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
    color: #3F434A;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-left:auto;
    margin-right:auto;
  }
</style>