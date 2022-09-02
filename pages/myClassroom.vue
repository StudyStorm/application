<script setup lang="ts">
import { ChevronRightIcon, Bars4Icon } from "@heroicons/vue/24/solid/index.js";
import { useDecksStore } from "~/store/decks";

import { Square2StackIcon } from "@heroicons/vue/24/outline/index.js";
import User from "~~/models/User";
import Deck from "../models/Deck";

import { useI18n } from "vue-i18n";

const displayStyle = ref("row");

const { t } = useI18n();

const store = useDecksStore();

const tableHeaders = [
  t("app.myClassroom.deckList.name"),
  t("app.myClassroom.deckList.author"),
  t("app.myClassroom.deckList.nbCards"),
  t("app.myClassroom.deckList.votes"),
];

// TMP CODE - Remove when integrating API
const tmpUser = new User();
tmpUser.id = "1";
tmpUser.firstName = "John";
tmpUser.lastName = "Doe";
tmpUser.email = "test@test.ch";

const tmpUser2 = new User();
tmpUser.id = "1";
tmpUser.firstName = "John";
tmpUser.lastName = "Doe";
tmpUser.email = "test@test.ch";

const tmpUser3 = new User();
tmpUser.id = "1";
tmpUser.firstName = "John";
tmpUser.lastName = "Doe";
tmpUser.email = "test@test.ch";

const tmpUser4 = new User();
tmpUser.id = "1";
tmpUser.firstName = "John";
tmpUser.lastName = "Doe";
tmpUser.email = "test@test.ch";

const deck1 = new Deck();
deck1.id = "af13b1c8-331c-4266-8c7d-4887bed851cd";
deck1.name = "Deck 1";
deck1.votes = 1;
deck1.creator = tmpUser;

const deck2 = new Deck();
deck2.id = "da5c255c-a804-4e5e-ae84-8f2e6e03129d";
deck2.name = "Deck 2";
deck2.votes = 100;
deck2.creator = tmpUser;

const deck3 = new Deck();
deck3.id = "6e79358a-8ca3-4dd7-b99e-3640cb91a420";
deck3.name = "Deck 3";
deck3.votes = 100000;
deck3.creator = tmpUser;

const deck4 = new Deck();
deck4.id = "b89cfb5b-ebff-4b9e-8e81-d47f2403b9eb";
deck4.name = "Deck 4";
deck4.votes = -1000000;
deck4.creator = tmpUser;

const deck5 = new Deck();
deck5.id = "266267b8-5f40-4464-94ef-717b53fef8f4";
deck5.name = "Deck 5";
deck5.votes = -545;
deck5.creator = tmpUser;

const deck6 = new Deck();
deck6.id = "51338620-182c-4989-b004-334e47fe6765";
deck6.name = "Deck 6";
deck6.votes = 10000000000;
deck6.creator = tmpUser;

const topDecks: Deck[] = [deck1, deck2, deck3, deck4, deck5, deck6];
const members: User[] = [tmpUser, tmpUser2, tmpUser3, tmpUser4];
store.allDecks = [...topDecks];
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

// END OF TEMP CODE

const deckName = ref<string>(" ");
const folderName = ref<string>("");

const viewAllMembers = ref(false);
const showModalDeck = ref(false);
const showModalFolder = ref(false);

async function createDeck() {
  // const { data: answer } = await useFetchAPI("/createClassroom", {
  //   method: "POST",
  //   body: datas.value,
  //   initialCache: false,
  // });
  // err.value = !answer.value;
  // if (answer.value) {
  //   resetField();
  //   router.push("/classrooms");
  // }
  console.log(deckName.value);
  showModalDeck.value = false;
}

async function createFolder() {
  // const { data: answer } = await useFetchAPI("/createClassroom", {
  //   method: "POST",
  //   body: datas.value,
  //   initialCache: false,
  // });
  // err.value = !answer.value;
  // if (answer.value) {
  //   resetField();
  //   router.push("/classrooms");
  // }
  console.log(folderName.value);
  showModalFolder.value = false;
}
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="flex min-w-0 flex-1 items-center justify-between">
        <h1
          class="flex text-lg font-medium leading-6 text-storm-dark sm:truncate"
        >
          <a href="#" class="hover:text-storm-blue hover:underline">
            {{ $t("app.myClassroom.title") }}
          </a>
          <ChevronRightIcon
            class="mx-1 mt-1 h-5 w-5 text-storm-dark"
            aria-hidden="true"
          />
          <a href="#" class="hover:text-storm-blue hover:underline">HEIG</a>
        </h1>
        <div>
          <button
            type="submit"
            class="rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ $t("app.myClassroom.manageButton") }}
          </button>
        </div>
      </div>
    </div>
    <div class="p-4 sm:px-6 lg:px-8">
      <h1 class="mb-8 text-3xl font-medium leading-6 text-storm-dark">
        {{ $t("app.myClassroom.topDecks") }}
      </h1>

      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        <DeckCard v-for="deck in topDecks" :key="deck.id" :deck="deck" />
      </div>

      <h1
        class="mt-8 mb-4 text-3xl font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.myClassroom.members") }}
      </h1>
      <div class="flex items-center justify-start">
        <img
          v-for="index in 3"
          :key="members[index].id"
          class="mr-4 h-16 w-16 rounded-full"
          src="/images/anonymousProfile.png"
          alt="Profile pic"
        />
        <button
          type="submit"
          class="ml-0 h-12 rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue sm:ml-6"
          @click="viewAllMembers = true"
        >
          {{ $t("app.myClassroom.membersButton") }}
        </button>
      </div>

      <h1
        class="mt-8 mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.myClassroom.exploreDecks") }}
        <button
          type="submit"
          class="ml-6 h-12 rounded-md border border-transparent bg-storm-darkblue px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue"
          @click="showModalDeck = true"
        >
          {{ $t("app.myClassroom.decksButton") }}
        </button>
      </h1>

      <div class="flex items-center justify-between">
        <div>
          <input
            v-model="store.searchFilter"
            name="searchDeck"
            type="text"
            class="block w-40 flex-auto rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-80 sm:text-sm md:w-96"
            :placeholder="$t('app.myClassroom.decksPlaceholder')"
          />
        </div>

        <div
          class="flex cursor-pointer divide-x-2 rounded-sm border text-storm-dark"
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
      </div>

      <div
        class="mt-6 block items-center justify-start text-2xl font-medium leading-6 text-storm-dark sm:flex sm:truncate"
      >
        <div class="flex items-center">
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
        </div>

        <button
          type="submit"
          class="mt-6 h-12 rounded-md border border-transparent bg-storm-darkblue px-14 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-blue sm:ml-16 sm:mt-0"
          @click="showModalFolder = true"
        >
          {{ $t("app.myClassroom.folderButton") }}
        </button>
      </div>

      <div
        class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6 2xl:grid-cols-7"
      >
        <FolderCard v-for="folder in folders" :name="folder" />
      </div>

      <!-- Projects list (mobile) -->
      <div class="mt-10 sm:hidden">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-storm-dark">Projects</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="deck in store.filteredDecks" :key="deck.id">
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
          </li>
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
              <tr
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
                        {{ deck.formattedVotes }}
                      </span>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
            <DeckCard
              v-for="deck in store.filteredDecks"
              :key="deck.id"
              :deck="deck"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-model="showModalDeck">
    <template #title> {{ $t("app.myClassroom.deckModal.title") }} </template>
    <template #content>
      <form action="#">
        <label for="name" class="block text-sm font-medium text-gray-700">
          {{ $t("app.myClassroom.deckModal.name") }}
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
        @click="createDeck"
      >
        {{ $t("app.myClassroom.deckModal.submit") }}
      </button>
      <button
        ref="cancelButtonRef"
        type="reset"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModalDeck = false"
      >
        {{ $t("app.myClassroom.deckModal.cancel") }}
      </button>
    </template>
  </Modal>

  <Modal v-model="showModalFolder">
    <template #title> {{ $t("app.myClassroom.folderModal.title") }} </template>
    <template #content>
      <form action="#">
        <label for="name" class="block text-sm font-medium text-gray-700">
          {{ $t("app.myClassroom.folderModal.name") }}
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
        @click="createFolder"
      >
        {{ $t("app.myClassroom.folderModal.submit") }}
      </button>
      <button
        ref="cancelButtonRef"
        type="reset"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="showModalFolder = false"
      >
        {{ $t("app.myClassroom.folderModal.cancel") }}
      </button>
    </template>
  </Modal>

  <Modal v-model="viewAllMembers">
    <template #title>
      <div class="mt-4">
        {{ $t("app.myClassroom.allMembers") }}
      </div>
    </template>
  </Modal>
</template>
