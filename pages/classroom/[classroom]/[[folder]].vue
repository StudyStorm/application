<script setup lang="ts">
import { ChevronRightIcon, Bars4Icon } from "@heroicons/vue/24/solid/index.js";

import { Square2StackIcon } from "@heroicons/vue/24/outline/index.js";

import Folder from "~/models/Folder";
import { useFetchAPI } from "#imports";
import Classroom from "~/models/Classroom";

const displayStyle = ref<"block" | "list">("block");

const showModalDeck = ref(false);
const showModalFolder = ref(false);

const props = defineProps<{
  classroom: Classroom;
}>();

const route = useRoute();

const { data: folder } = await useFetchAPI<Folder>(
  `/v1/folders/${route.params.folder ?? props.classroom.root_folder.id}`
);
</script>

<template>
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
        <a href="#" class="hover:text-storm-blue hover:underline">{{
          $route.params.folder
        }}</a>
      </h1>

      <div class="flex">
        <div
          class="mr-4 flex cursor-pointer divide-x-2 rounded-sm border text-storm-dark"
        >
          <span
            class="p-2 hover:scale-110"
            :class="{ 'bg-gray-200': displayStyle === 'list' }"
            @click="displayStyle = 'list'"
          >
            <Bars4Icon class="h-5 w-5"
          /></span>
          <span
            class="p-2 hover:scale-110"
            :class="{ 'bg-gray-200': displayStyle === 'block' }"
            @click="displayStyle = 'block'"
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
  </div>

  <folder-content
    :folder="folder"
    :mode="displayStyle"
    @show-modal-folder="showModalFolder = true"
  />
</template>
