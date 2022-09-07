<script setup lang="ts">
import { ref } from "#imports";
import { useDecksStore } from "~/store/decks";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline/index.js";
const store = useDecksStore();

const showModal = ref(false);

const editingDeckName = ref(store.currentDeck.name);

const init = () => {
  showModal.value = true;
};

const updateDeck = async () => {
  await store.updateDeckName(store.currentDeck.id, editingDeckName.value);
  showModal.value = false;
};
</script>

<template>
  <slot :open="init" />
  <Modal v-model="showModal" :autoclose="false">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <SquaresPlusIcon class="h-6 w-6 text-purple-600" aria-hidden="true" />
      </div>
    </template>
    <template #title>
      {{ $t("app.deck.modal.edit.title") }}
    </template>
    <template #content>
      <div class="mt-8 w-full space-y-4 px-7 sm:px-0 xl:mx-auto">
        <label
          for="name"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ $t("app.deck.modal.name") }}
        </label>
        <input
          id="name"
          v-model="editingDeckName"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="updateDeck"
      >
        {{ $t("app.deck.modal.buttons.edit") }}
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.deck.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>
