<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline/index.js";

const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
const confirmPassword = ref("");
const err = ref<null | any>(null);
const showModal = ref(false);

const updatePicture = (picture: File) => {
  console.log("Save got", picture);
};

// TODO: Retrieve user information apart from password
userInformation.value.firstName = "John";
userInformation.value.lastName = "Doe";
userInformation.value.email = "john.@gmail.com";

async function save() {
  if (userInformation.value.password === confirmPassword.value) {
    const { data: answer, error } = await useFetchAPI("/save", {
      method: "PATCH",
      body: userInformation.value,
      initialCache: false,
    });

    err.value = !answer.value;

    if (answer.value) {
    }
  }
}

async function deleteAccount() {
  // TODO: Delete user account through backend
  showModal.value = true;
}
</script>

<template>
  <div
    class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {{ $t("app.profile.title") }}
      </h1>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="save">
        <div class="mx-auto h-48 w-48 text-center">
          <div class="mb-4">
            <label class="mt-6 cursor-pointer">
              <FileInputPrewiever @valid-file="updatePicture" />
            </label>
          </div>
        </div>

        <div>
          <label
            for="firstname"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t("app.profile.labels.firstname") }}
          </label>
          <div class="mt-1">
            <input
              id="firstname"
              v-model="userInformation.firstName"
              name="firstname"
              type="text"
              autocomplete="firstname"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="lastname" class="block text-sm font-medium text-gray-700">
            {{ $t("app.profile.labels.lastname") }}
          </label>
          <div class="mt-1">
            <input
              id="lastname"
              v-model="userInformation.lastName"
              name="lastname"
              type="text"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            {{ $t("app.profile.labels.email") }}
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="userInformation.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            {{ $t("app.profile.labels.password") }}
          </label>
          <div class="mt-1">
            <input
              id="password"
              v-model="userInformation.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            {{ $t("app.profile.labels.confirmPassword") }}
          </label>
          <div class="mt-1">
            <input
              id="confirm_password"
              v-model="confirmPassword"
              name="confirm_password"
              type="password"
              autocomplete="curent-password"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ $t("app.profile.buttons.save") }}
          </button>
        </div>
        <div>
          <button
            type="button"
            class="flex w-full justify-center rounded-md border border-transparent bg-storm-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-red-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="deleteAccount"
          >
            {{ $t("app.profile.buttons.delete") }}
          </button>
        </div>
      </form>
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
      {{ $t("app.profile.modal.title") }}
    </template>
    <template #content>
      {{ $t("app.profile.modal.content") }}
    </template>
    <template #footer>
      <button
        type="confirmDeleteRef"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModal = false"
      >
        {{ $t("app.profile.modal.buttons.confirmDelete") }}
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
