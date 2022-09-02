<script setup lang="ts">
   import { SquaresPlusIcon } from "@heroicons/vue/24/outline/index.js";
   const showModal = ref(false);

   const cardInformation = ref({
      content: {
         question: "",
         answer: "",
         type: ""
      },
      type: ""
   });

   async function create(){

   }

</script>

<template>


   <Modal v-model="showModal">
      <template #icon
         ><div
            class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10"
         >
            <SquaresPlusIcon
               class="h-6 w-6 text-purple-600"
               aria-hidden="true"
            />
         </div>
      </template>
      <template #title>
         {{ $t("app.deck.modal.create.title") }}
      </template>
      <template #content>
         <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10 space-y-6">
               <div>
                  <label
                     for="firstname"
                     class="block text-sm font-medium text-gray-700"
                  >
                     {{ $t("app.deck.modal.labels.question") }}
                  </label>
                  <div class="mt-1">
                     <input
                     id="firstname"
                     v-model="cardInformation.content.question"
                     name="firstname"
                     type="text"
                     required
                     class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
               </div>
               <div>
                  <label for="answer" class="block text-sm font-medium text-gray-700">
                     {{ $t("app.deck.modal.labels.answer") }}
                  </label>
                  <div class="mt-1">
                     <input
                     id="answer"
                     v-model="cardInformation.content.answer"
                     name="answer"
                     type="text"
                     required
                     class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
               </div>
            </div>
         </div>
      </template>
      <template #footer>
         <button
         ref="confirmDeleteRef"
         type="button"
         class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
         @click="showModal = false"
         >
            {{ $t("app.deck.modal.buttons.create") }}
         </button>
         <button
         ref="cancelButtonRef"
         type="button"
         class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
         @click="showModal = false"
         >
            {{ $t("app.deck.modal.buttons.cancel") }}
         </button>
      </template>
   </Modal>
</template>