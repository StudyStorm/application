<script lang="ts" setup>
import { FlagIcon } from "@heroicons/vue/24/outline/index.js";
import { useLearnStore } from "~/store/learn";

const showModal = ref(false);
const signalMessage = ref("");

const learnStore = useLearnStore();
const closeModal = () => {
  showModal.value = false;
  signalMessage.value = "";
};

const openModal = () => {
  showModal.value = true;
};

const reportCard = async () => {
  await learnStore.reportCard(learnStore.currentCard.id, signalMessage.value);
  closeModal();
};

defineExpose({
  closeModal,
  openModal,
});
</script>
<template>
  <slot :open="openModal" />
  <Modal v-model="showModal">
    <template #icon
      ><div
        class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <FlagIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
    </template>
    <template #title>
      {{ $t("app.learn.modal.title") }}
    </template>
    <template #content>
      <div class="mb-6">
        <label
          for="message"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ $t("app.learn.modal.message") }}</label
        >
        <input
          id="message"
          v-model="signalMessage"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-storm-red focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="reportCard"
      >
        {{ $t("app.learn.modal.buttons.confirmSignal") }}
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.learn.modal.buttons.cancel") }}
      </button>
    </template>
  </Modal>
</template>
