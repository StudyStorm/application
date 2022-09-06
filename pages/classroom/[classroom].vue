<script setup lang="ts">
import { useClassroomStore } from "~/store/classroom";
import { useFetchAPI } from "#imports";
import { useRoute } from "#app";
import Classroom from "~/models/Classroom";
import User from "~/models/User";
import { Pagination } from "~/types/app";
import { AcademicCapIcon } from "@heroicons/vue/24/solid/index.js";

const route = useRoute();
const classroomStore = useClassroomStore();
await classroomStore.fetchClassroom(route.params.classroom as string);

const deckName = ref<string>(" ");
const folderName = ref<string>("");

const viewAllMembers = ref(false);
const showModalDeck = ref(false);
const showModalFolder = ref(false);

const { data: classroom } = await useFetchAPI<Classroom>(
  `/v1/classrooms/${route.params.classroom}`
);
if (!classroom) {
  throw createError({ statusCode: 404, statusMessage: "Classroom not found" });
}
const { data: members } = await useFetchAPI<Pagination<User>>(
  `/v1/classrooms/${route.params.classroom}/users`,
  { params: { limit: 5 } }
);
</script>

<template>
  <div>
    <div>
      <div class="p-4 sm:px-6 lg:px-8">
        <h1
          class="mb-4 text-2xl font-bold leading-7 text-storm-dark sm:truncate sm:text-3xl"
        >
          <AcademicCapIcon class="inline h-6 w-6" />
          {{ classroom.name }}
        </h1>
        <div>
          <h1 class="text-lg font-medium leading-6 text-storm-dark sm:truncate">
            {{ $t("app.classroom.members") }}
          </h1>
          <div class="flex min-w-0 flex-1 items-center justify-between">
            <div class="flex">
              <div class="flex -space-x-4">
                <nuxt-img
                  v-for="member in members.data"
                  :key="member.id"
                  class="h-12 w-12 shrink-0 rounded-full border-2 border-white dark:border-gray-800"
                  :src="member.picture_url"
                />
                <div
                  v-if="members.data.length < members.meta.total"
                  class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white dark:border-gray-800"
                >
                  {{ members.meta.total - members.data.length }}
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {{ $t("app.classroom.membersButton") }}
              </button>
            </div>
          </div>
        </div>
        <nuxt-page :classroom="classroom" :page-key="$route.params.folder" />
      </div>
    </div>

    <Modal v-model="showModalDeck">
      <template #title> {{ $t("app.classroom.deckModal.title") }} </template>
      <template #content>
        <form action="#">
          <label for="name" class="block text-sm font-medium text-gray-700">
            {{ $t("app.classroom.deckModal.name") }}
          </label>
          <div class="mt-1">
            <input
              id="name"
              v-model="deckName"
              name="name"
              type="text"
              required
              autocomplete="off"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <button
          type="submit"
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {{ $t("app.classroom.deckModal.submit") }}
        </button>
        <button
          type="reset"
          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          @click="showModalDeck = false"
        >
          {{ $t("app.classroom.deckModal.cancel") }}
        </button>
      </template>
    </Modal>

    <Modal v-model="showModalFolder">
      <template #title> {{ $t("app.classroom.folderModal.title") }} </template>
      <template #content>
        <form action="#">
          <label for="name" class="block text-sm font-medium text-gray-700">
            {{ $t("app.classroom.folderModal.name") }}
          </label>
          <div class="mt-1">
            <input
              id="name"
              v-model="folderName"
              name="name"
              type="text"
              required
              autocomplete="off"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <button
          type="submit"
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          @click="classroomStore.createFolder"
        >
          {{ $t("app.classroom.folderModal.submit") }}
        </button>
        <button
          type="reset"
          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          @click="showModalFolder = false"
        >
          {{ $t("app.classroom.folderModal.cancel") }}
        </button>
      </template>
    </Modal>

    <Modal v-model="viewAllMembers">
      <template #title>
        <div class="mt-4">
          {{ $t("app.classroom.allMembers") }}
        </div>
      </template>
    </Modal>
  </div>
</template>
