<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/solid/index.js";

defineProps<{
  last: number;
  currentPage: number;
}>();

const emit = defineEmits(["changePage"]);

const changePage = (page: number) => {
  emit("changePage", page);
};
</script>

<template>
  <ul class="inline-flex items-center -space-x-px">
    <li>
      <a
        class="ml-0 block cursor-pointer rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        @click="changePage(currentPage - 1)"
      >
        <ChevronLeftIcon class="h-5" />
      </a>
    </li>
    <li v-for="i in last" :key="i" @click="changePage(i)">
      <a
        class="cursor-pointer border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
        aria-current="page"
        :class="{
          'font-bold bg-gray-200': i === currentPage,
        }"
        >{{ i }}
      </a>
    </li>
    <li>
      <a
        class="block cursor-pointer rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="changePage(currentPage + 1)"
      >
        <ChevronRightIcon class="h-5" />
      </a>
    </li>
  </ul>
</template>
