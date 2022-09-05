<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/solid/index.js";
import Folder from "~/models/Folder";
import { useDecksStore } from "~/store/decks";

defineProps<{
  folder: Folder;
}>();

const { t } = useI18n();

const tableHeaders = [
  t("app.classroom.deckList.name"),
  t("app.classroom.deckList.author"),
  t("app.classroom.deckList.nbCards"),
  t("app.classroom.deckList.votes"),
];

const store = useDecksStore();
</script>
<template>
  <!-- Projects list (mobile) -->
  <div class="mt-10 sm:hidden">
    <div class="px-4 sm:px-6">
      <h2 class="text-sm font-medium text-storm-dark">Projects</h2>
    </div>
    <ul
      role="list"
      class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
    >
      <li v-for="subFolder in folder.children" :key="subFolder.id">
        <NuxtLink
          :to="`/deck/${subFolder.id}`"
          class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
        >
          <span class="flex items-center space-x-3 truncate">
            <span class="truncate text-sm font-medium leading-6">
              {{ subFolder.name }}
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
    <div class="inline-block min-w-full border-b border-gray-200">
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
            v-for="(subFolder, i) in folder.children"
            :key="subFolder.id"
            :class="{ 'bg-gray-100': i % 2 === 0 }"
          >
            <td class="whitespace-nowrap px-6 py-3 text-sm font-medium">
              <div class="flex items-center space-x-3 lg:pl-2">
                <NuxtLink
                  :to="`folder/${subFolder.id}`"
                  class="truncate hover:text-gray-600"
                >
                  <span>
                    {{ subFolder.name }}
                  </span>
                </NuxtLink>
              </div>
            </td>
            <td
              class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
            >
              <div class="flex items-center space-x-3 lg:pl-2">
                <a class="truncate hover:text-gray-600">
                  <span> John Doe </span>
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
                  <span> 10 votes </span>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
