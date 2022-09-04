<script setup lang="ts">
import { ChevronRightIcon, Bars4Icon } from "@heroicons/vue/24/solid/index.js";
import { useDecksStore } from "~/store/decks";

import {
  Square2StackIcon,
  FolderPlusIcon,
} from "@heroicons/vue/24/outline/index.js";

import { useI18n } from "vue-i18n";
import { useClassroomStore } from "../../store/classroom";

const route = useRoute();
const classroomStore = useClassroomStore();

await classroomStore.fetchClassroom(route.params.id as string);

const displayStyle = ref("row");

const { t } = useI18n();

const store = useDecksStore();

const tableHeaders = [
  t("app.classroom.deckList.name"),
  t("app.classroom.deckList.author"),
  t("app.classroom.deckList.nbCards"),
  t("app.classroom.deckList.votes"),
];

const folders = [
  "Pointeurs de pointeurs",
  "Folder 2",
  "Folder 3",
  "Folder 4",
  "Folder 5",
  "Folder 6",
  "Folder 7",
  "Folder 8",
  "Folder 9",
];

const deckName = ref<string>(" ");
const folderName = ref<string>("");

const viewAllMembers = ref(false);
const showModalDeck = ref(false);
const showModalFolder = ref(false);
</script>

<template>
  <div>
    <div>
      <div
        class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <div class="flex min-w-0 flex-1 items-center justify-between">
          <h1
            class="flex text-lg font-medium leading-6 text-storm-dark sm:truncate"
          >
            <a href="#" class="hover:text-storm-blue hover:underline">
              {{ $t("app.classroom.title") }}
            </a>
            <ChevronRightIcon
              class="mx-1 mt-1 h-5 w-5 text-storm-dark"
              aria-hidden="true"
            />
            <a href="#" class="hover:text-storm-blue hover:underline"
              >TODO: CLASSROOM NAME
            </a>
          </h1>
          <div>
            <button
              type="submit"
              class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {{ $t("app.classroom.manageButton") }}
            </button>
          </div>
        </div>
      </div>
      <div class="p-4 sm:px-6 lg:px-8">
        <h1
          class="mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
        >
          {{ $t("app.classroom.topDecks") }}
        </h1>

        <div class="mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          <!-- TODO: add this again with API -->
          <!-- <DeckCard v-for="deck in topDecks" :key="deck.id" :deck="deck" /> -->
        </div>

        <h1
          class="mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
        >
          {{ $t("app.classroom.members") }}
        </h1>
        <div class="flex min-w-0 flex-1 items-center justify-between">
          <div class="flex">
            <!-- TODO: add this again with API -->
            <!-- <NuxtImg
            v-for="index in 3"
            :key="members[index].id"
            class="mx-1 h-10 w-10 rounded-full"
            src="/images/anonymousProfile.png"
            alt="Profile pic"
          /> -->
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

        <h1
          class="mt-8 mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
        >
          {{ $t("app.classroom.exploreDecks") }}
        </h1>

        <div class="flex items-center justify-between">
          <div>
            <input
              v-model="store.searchFilter"
              name="searchDeck"
              type="text"
              class="block w-40 flex-auto rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-80 sm:text-sm md:w-96"
              :placeholder="$t('app.classroom.decksPlaceholder')"
            />
          </div>

          <div class="flex">
            <div
              class="mr-4 flex cursor-pointer divide-x-2 rounded-sm border text-storm-dark"
            >
              <span
                class="p-2 hover:scale-110"
                :class="{ 'bg-gray-200': displayStyle === 'row' }"
                @click="displayStyle = 'row'"
              >
                <Bars4Icon class="h-5 w-5"
              /></span>
              <span
                class="p-2 hover:scale-110"
                :class="{ 'bg-gray-200': displayStyle === 'card' }"
                @click="displayStyle = 'card'"
                ><Square2StackIcon class="h-5 w-5"
              /></span>
            </div>
            <div>
              <button
                type="submit"
                class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="showModalDeck = true"
              >
                {{ $t("app.classroom.decksButton") }}
              </button>
            </div>
          </div>
        </div>

        <div
          class="mt-6 block items-center justify-start text-2xl font-medium leading-6 text-storm-dark sm:flex sm:truncate"
        >
          <div class="flex min-w-0 flex-1 items-center justify-between">
            <h1
              class="flex text-lg font-medium leading-6 text-storm-dark sm:truncate"
            >
              <a href="#" class="hover:text-storm-blue hover:underline">HEIG</a>
              <ChevronRightIcon
                class="mx-1 mt-1 h-5 w-5 text-storm-dark"
                aria-hidden="true"
              />
              <a href="#" class="hover:text-storm-blue hover:underline">PRG2</a>
              <ChevronRightIcon
                class="mx-1 mt-1 h-5 w-5 text-storm-dark"
                aria-hidden="true"
              />
              <a href="#" class="hover:text-storm-blue hover:underline"
                >Pointeurs</a
              >
            </h1>
          </div>
        </div>

        <div
          class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6 2xl:grid-cols-7"
        >
          <div
            to="#"
            class="rounded-lg p-4 shadow-md transition hover:scale-105 hover:bg-gray-200"
            @click="showModalFolder = true"
          >
            <div class="flex items-center space-x-4">
              <div class="w-10 shrink-0">
                <FolderPlusIcon />
              </div>
              <div class="min-w-0 flex-1">
                <p
                  class="truncate text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ $t("app.classroom.folderButton") }}
                </p>
              </div>
            </div>
          </div>
          <FolderCard v-for="folder in folders" :key="folder" :name="folder" />
        </div>

        <hr class="my-8" />

        <!-- Projects list (mobile) -->
        <div class="mt-10 sm:hidden">
          <div class="px-4 sm:px-6">
            <h2 class="text-sm font-medium text-storm-dark">Projects</h2>
          </div>
          <ul
            role="list"
            class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
          >
            <!-- TODO: add this again with API -->
            <!-- <li v-for="deck in store.filteredDecks" :key="deck.id">
            <NuxtLink
              :to="`/deck/${deck.id}`"
              class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span class="truncate text-sm font-medium leading-6">
                  {{ deck.name }}
                </span>
              </span>
              <ChevronRightIcon
                class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </NuxtLink>
          </li> -->
          </ul>
        </div>

        <!-- Projects table (desktop) -->
        <div class="mt-8 hidden sm:block">
          <div
            v-if="displayStyle === 'row'"
            class="inline-block min-w-full border-b border-gray-200"
          >
            <table class="min-w-full">
              <thead>
                <tr class="border-t border-gray-200">
                  <th
                    v-for="(header, i) in tableHeaders"
                    :key="i"
                    class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    <span class="lg:pl-2">{{ header }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <!-- TODO: add this again with API -->
                <!-- <tr
                v-for="(deck, i) in store.filteredDecks"
                :key="deck.id"
                :class="{ 'bg-gray-100': i % 2 === 0 }"
              >
                <td class="whitespace-nowrap px-6 py-3 text-sm font-medium">
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <NuxtLink
                      :to="`deck/${deck.id}`"
                      class="truncate hover:text-gray-600"
                    >
                      <span>
                        {{ deck.name }}
                      </span>
                    </NuxtLink>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <a class="truncate hover:text-gray-600">
                      <span>
                        {{ deck.creator.fullname }}
                      </span>
                    </a>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <a class="truncate hover:text-gray-600">
                      <span> N cards </span>
                    </a>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <a class="truncate hover:text-gray-600">
                      <span>
                        {{ deck.votes }}
                      </span>
                    </a>
                  </div>
                </td>
              </tr> -->
              </tbody>
            </table>
          </div>
          <div v-else>
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
              <!-- <DeckCard
              v-for="deck in store.filteredDecks"
              :key="deck.id"
              :deck="deck"
            /> -->
            </div>
          </div>
        </div>
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
