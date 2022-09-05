<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline/index.js";
import { FormError } from "~/types/app";
import { useProfileStore } from "~/store/profile";

const showModal = ref(false);

const errors = ref<FormError | null>(null);

const profileStore = useProfileStore();
const userInformation = profileStore.profile;

const updatePicture = (picture: File) => {
  console.log("Save got", picture);
};

async function save() {
  await profileStore.updateProfile();
}

async function deleteAccount() {
  showModal.value = false;
  await profileStore.deleteProfile();
}
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {{ $t("app.profile.title") }}
        </h1>
      </div>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md lg:mt-8">
      <div class="flex justify-center px-4 pb-2 sm:rounded-lg sm:px-10">
        <s-form
          class="w-full max-w-sm space-y-2 px-7 pb-4 md:space-y-6"
          :errors="errors"
          @submit.prevent=""
        >
          <div class="mx-auto h-24 w-24 text-center">
            <s-file-input-preview
              class="mt-6 cursor-pointer"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              :url="userInformation.picture_url"
              @valid-file="updatePicture"
            />
          </div>

          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.profile.labels.firstname") }}
            </label>
            <div class="mt-1">
              <s-input
                id="firstName"
                v-model="userInformation.first_name"
                name="firstName"
                type="text"
                required
                autocomplete="given-name"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.profile.labels.lastname") }}
            </label>
            <div class="mt-1">
              <s-input
                id="lastName"
                v-model="userInformation.last_name"
                name="lastName"
                type="text"
                autocomplete="family-name"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t("app.profile.labels.email") }}
            </label>
            <div class="mt-1">
              <s-input
                id="email"
                v-model="userInformation.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.profile.labels.password") }}
            </label>
            <div class="mt-1">
              <s-password-input
                id="password"
                v-model="userInformation.password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>
          <div class="pt-2">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-storm-blue py-3 text-base font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 md:py-2 md:text-sm"
              @click="save"
            >
              {{ $t("app.profile.buttons.save") }}
            </button>
          </div>
          <div class="pt-2">
            <div class="rounded-md border border-red-400 bg-red-200 p-4">
              <div class="mx-2 mb-2 -mt-2 flex items-center">
                <p class="font-sm mr-1 font-medium text-red-600">
                  {{ $t("app.profile.buttons.danger") }}
                </p>
                <ExclamationTriangleIcon
                  class="inline-block h-5 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-storm-red py-3 text-base font-medium text-white shadow-sm hover:bg-storm-red-hover focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200 md:py-2 md:text-sm"
                @click="showModal = true"
              >
                {{ $t("app.profile.buttons.delete") }}
              </button>
            </div>
          </div>
        </s-form>
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
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          @click="deleteAccount()"
        >
          {{ $t("app.profile.modal.buttons.confirmDelete") }}
        </button>
        <button
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-storm-darkblue focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          @click="showModal = false"
        >
          {{ $t("app.profile.modal.buttons.cancel") }}
        </button>
      </template>
    </Modal>
  </div>
</template>
