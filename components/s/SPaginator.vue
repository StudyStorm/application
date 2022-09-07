<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/solid/index.js";

const props = defineProps<{
  last: number;
  currentPage: number;
  maxVisible: number;
}>();

const emit = defineEmits(["changePage"]);

const pages = computed(() => {
  const center = Math.floor(props.maxVisible / 2);
  const start = Math.max(props.currentPage - center, 1);
  const end = Math.min(start + props.maxVisible - 1, props.last);
  const p = [];
  for (let i = Math.max(end - props.maxVisible + 1, 1); i <= end; i++) {
    p.push(i);
  }
  return p;
});

const changePage = (page: number) => {
  emit("changePage", page);
};
</script>

<template>
  <ul class="inline-flex items-center -space-x-px">
    <li
      class="ml-0 block cursor-pointer rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      @click="changePage(currentPage - 1)"
    >
      <ChevronLeftIcon class="h-5" />
    </li>
    <li
      v-if="currentPage > 1"
      class="block cursor-pointer border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
      @click="changePage(1)"
    >
      <ChevronDoubleLeftIcon class="h-5" />
    </li>
    <li
      v-for="i in pages"
      :key="i"
      class="cursor-pointer border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
      aria-current="page"
      :class="{
        'font-bold bg-gray-200': i === currentPage,
      }"
      @click="changePage(i)"
    >
      {{ i }}
    </li>
    <li
      v-if="currentPage < last"
      class="block cursor-pointer border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
      @click="changePage(last)"
    >
      <ChevronDoubleRightIcon class="h-5" />
    </li>
    <li
      class="block cursor-pointer rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      @click="changePage(currentPage + 1)"
    >
      <ChevronRightIcon class="h-5" />
    </li>
  </ul>
</template>
