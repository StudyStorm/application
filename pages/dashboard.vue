<script setup>
import { ChevronRightIcon } from "@heroicons/vue/24/solid/index.js";
</script>

<template>
  <div
    class="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="flex-1 min-w-0">
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
      class="mt-3 border-t border-gray-200 divide-y divide-gray-100"
    >
      <li v-for="i in 10" :key="i">
        <a
          href="#"
          class="flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6"
        >
          <span class="flex items-center space-x-3 truncate">
            <span class="text-sm font-medium leading-6 truncate">
              {{ i }}
            </span>
          </span>
          <ChevronRightIcon
            class="w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </a>
      </li>
    </ul>
  </div>

  <!-- Projects table (desktop) -->
  <div class="hidden mt-8 sm:block">
    <div class="inline-block min-w-full align-middle border-b border-gray-200">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-200">
            <th
              class="px-6 py-3 text-sm font-semibold text-left text-gray-900 border-b border-gray-200 bg-gray-50"
              scope="col"
            >
              <span class="lg:pl-2">Project</span>
            </th>
            <th
              class="px-6 py-3 text-sm font-semibold text-left text-gray-900 border-b border-gray-200 bg-gray-50"
              scope="col"
            >
              Members
            </th>
            <th
              class="hidden px-6 py-3 text-sm font-semibold text-right text-gray-900 border-b border-gray-200 md:table-cell bg-gray-50"
              scope="col"
            >
              Last updated
            </th>
            <th
              class="py-3 pr-6 text-sm font-semibold text-right text-gray-900 border-b border-gray-200 bg-gray-50"
              scope="col"
            />
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="i in 10" :key="i">
            <td
              class="w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap"
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
              class="hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap"
            >
              {{ i }}
            </td>
            <td
              class="px-6 py-3 text-sm font-medium text-right whitespace-nowrap"
            >
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
