<script setup>
import { ChevronRightIcon } from "@heroicons/vue/24/solid/index.js";
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Dashboard
        </h1>
      </div>
    </div>

    <!-- Projects list (mobile) -->
    <div class="mt-10 sm:hidden">
      <div class="px-4 sm:px-6">
        <h2 class="text-sm font-medium text-gray-900">Projects</h2>
      </div>
      <ul
        role="list"
        class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
      >
        <li v-for="i in 10" :key="i">
          <a
            href="#"
            class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
          >
            <span class="flex items-center space-x-3 truncate">
              <span class="truncate text-sm font-medium leading-6">
                {{ i }}
              </span>
            </span>
            <ChevronRightIcon
              class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>

    <!-- Projects table (desktop) -->
    <div class="mt-8 hidden sm:block">
      <div
        class="inline-block min-w-full border-b border-gray-200 align-middle"
      >
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-200">
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span class="lg:pl-2">Project</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Members
              </th>
              <th
                class="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                scope="col"
              >
                Last updated
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="i in 10" :key="i">
              <td
                class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
              >
                <div class="flex items-center space-x-3 lg:pl-2">
                  <a href="#" class="truncate hover:text-gray-600">
                    <span>
                      {{ i }}
                    </span>
                  </a>
                </div>
              </td>
              <td
                class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell"
              >
                {{ i }}
              </td>
              <td
                class="whitespace-nowrap px-6 py-3 text-right text-sm font-medium"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
