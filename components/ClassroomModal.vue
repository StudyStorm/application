<script lang="ts" setup>
import { useClassroomStore } from "../store/classroom";
import { XMarkIcon } from "@heroicons/vue/24/outline/index.js";

const classroomStore = useClassroomStore();

const hasError = ref(false);

const showModal = ref(false);
const name = ref("");
const selectedVisibilty = ref("public");

const closeModal = () => {
  showModal.value = false;
  name.value = "";
};

const openModal = () => {
  showModal.value = true;
};

defineExpose({
  closeModal,
  openModal,
});

const create = async (classroom: { name: string; visibility: string }) => {
  const { error } = await classroomStore.createClassroom(classroom);

  if (error) {
    hasError.value = true;
  } else {
    await classroomStore.fetchClassrooms();
    showModal.value = false;
  }
};
</script>
<template>
  <slot :open="openModal" />
  <Modal v-model="showModal">
    <template #title>
      {{ $t("app.classrooms.modal.title") }}
    </template>
    <template #content>
      <div class="mt-6">
        <div class="flex items-end space-x-2">
          <div class="flex-1">
            <label
              for="message"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ $t("app.classrooms.modal.name") }}</label
            >
            <input
              id="message"
              v-model="name"
              type="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <hr class="my-4" />
        <div>
          <label
            for="message"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{ $t("app.classrooms.modal.visibility") }}</label
          >
          <select
            id="countries"
            v-model="selectedVisibilty"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:w-1/2"
          >
            <option selected value="public">
              {{ $t("app.classrooms.modal.public") }}
            </option>
            <option value="private">
              {{ $t("app.classrooms.modal.private") }}
            </option>
          </select>
        </div>
      </div>
      <div
        v-if="hasError"
        class="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <span class="block sm:inline">{{
          $t("app.deck.modal.labels.error")
        }}</span>
        <span
          class="absolute inset-y-0 right-0 cursor-pointer px-4 py-3"
          @click="hasError = false"
        >
          <XMarkIcon
            class="h-5 w-5 text-red-600"
            aria-hidden="true"
          ></XMarkIcon>
        </span>
      </div>
    </template>
    <template #footer>
      <button
        v-if="name !== ''"
        type="submit"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="create({ name: name, visibility: selectedVisibilty })"
      >
        {{ $t("app.classrooms.modal.confirm") }}
      </button>

      <button
        type="button"
        class="mt-4 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.classrooms.modal.cancel") }}
      </button>
    </template>
  </Modal>
</template>
