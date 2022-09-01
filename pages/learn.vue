<script setup lang="ts">
   import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from "@heroicons/vue/24/outline/index.js";
   const decksName = "Decks name";
   const author = "Firstname Lastname";

   const err = ref<null | any>(null);
   const showModal = ref(false);

   const cardIndex = ref(0);
   const flashCard = ref();
   const progressBar = ref();
   const nextCardButton = ref();
   const previousCardButton = ref();

   const cards = [
      { 
         question: "Where am I?",
         answer: "I am here",
         type: "string"
      },
      {
         question: "What is the capital of switzerland?",
         answer: "Berne",
         type: "string"
      },
      {
         question: "What is the capital of Germany?",
         answer: "Berlin",
         type: "string"
      },
      {
         question: "What is the capital of France?",
         answer: "Paris",
         type: "string"
      },
      {
         question: "What is the capital of the United Stated of America?",
         answer: "Washington DC",
         type: "string"
      }
   ];

   function updateProgressBar() {
      progressBar.value.style.width = 100 * (cardIndex.value / (cards.length - 1)) + '%';
   }

   async function previousCard(){
      if (cardIndex.value){
         previousCardButton.value.style.disabled = false;
         // If card is flipped, flip card without showing the previous card answer
         await flashCard.value.resetCard()
         --cardIndex.value
         updateProgressBar();
      } else {
         previousCardButton.value.style.disabled = true;
      }
   }

   async function nextCard(){
      if(cardIndex.value < cards.length - 1){
         nextCardButton.value.style.disabled = false;
         // If card is flipped, flip card without showing the next card answer
         await flashCard.value.resetCard()
         ++cardIndex.value
         updateProgressBar();
      } else{
         nextCardButton.value.style.disabled = true;
      }
   }


   async function signalCard() {
      // TODO: Signal current card
      showModal.value = false;
   }


</script>

<template>
   <div
    class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
      <div class="min-w-0">
         <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {{ decksName }}
            <span class="text-sm font-small leading-6 text-gray-900 sm:truncate">
               {{ $t("app.learn.text.by") }} {{ author }}
            </span>
         </h1>
      </div>
   </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
         <div class="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" style="width: 0%" ref="progressBar"></div>
      </div>
      <FlashCard v-if="cards[cardIndex].type === 'string'" ref="flashCard" :question="cards[cardIndex].question" :answer="cards[cardIndex].answer"></FlashCard>
      <div class=" flex flex-col" style="display: flex; align-items: center; justify-content: center;">
         <div class="inline-flex">
            <button ref="previousCardButton" @click="previousCard" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 rounded-l">
               <ChevronLeftIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <button ref="nextCardButton" @click="nextCard" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 rounded-r">
               <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
            </button>
         </div>
      </div>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10 space-y-6">
      <div>
         <button
         type="button"
         class="flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-grey-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
         @click="showModal = true"
         >
         {{ $t("app.learn.buttons.signal") }}
         </button>
      </div>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <FlagIcon
          class="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
      </div>
    </template>
    <template #title>
      {{ $t("app.learn.modal.title") }}
    </template>
   <template #content>
      <div class="mb-6">
         <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t("app.learn.modal.message") }}</label>
         <input type="text" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
  </Modal>
</template>