<script setup lang="ts">
   import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline/index.js";

   const err = ref<null | any>(null);
   const showModal = ref(false);


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
        Decks name
      </h1>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
         <FlashCard></FlashCard>
         <div class=" flex flex-col" style="display: flex; align-items: center; justify-content: center;">
            <div class="inline-flex">
               <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 rounded-l">
                  <ChevronLeftIcon class="h-6 w-6" aria-hidden="true" />
               </button>
               <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 rounded-r">
                  <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
               </button>
            </div>
         </div>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <ExclamationTriangleIcon
          class="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
      </div>
    </template>
    <template #title>
      {{ $t("app.learn.modal.title") }}
    </template>
    <template #content>
      {{ $t("app.learn.modal.content") }}
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.learn.modal.buttons.confirmSignal") }}
      </button>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.profile.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>