<script lang="ts" setup>
import { useClassroomStore } from "../store/classroom";

const store = useClassroomStore();

const showModal = ref(false);
const addUserEmail = ref("");

const closeModal = () => {
  showModal.value = false;
  addUserEmail.value = "";
};

const openModal = () => {
  showModal.value = true;
};

const addMember = () => {
  store.addMember(store.classroom.id, addUserEmail.value, "read");
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
    <template #title>
      {{ $t("app.classroom.modal.title") }}
    </template>
    <template #content>
      <div class="mb-6">
        <label
          for="message"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ $t("app.classroom.modal.enterEmail") }}</label
        >
        <input
          id="message"
          v-model="addUserEmail"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />

        <hr class="my-4" />
        <div
          v-for="member in store.members.data"
          :key="member.id"
          class="flex items-center justify-between border-b py-2 text-storm-dark"
        >
          <div class="flex items-center">
            <nuxt-img
              class="h-10 w-10 rounded-full"
              :src="member.picture_url"
            ></nuxt-img>
            <div class="ml-4 font-medium">
              {{ member.first_name }} {{ member.last_name }}
            </div>
          </div>
          <div>
            {{ member.access_right }}
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="addMember"
      >
        {{ $t("app.classroom.modal.confirm") }}
      </button>

      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.classroom.modal.close") }}
      </button>
    </template>
  </Modal>
</template>
