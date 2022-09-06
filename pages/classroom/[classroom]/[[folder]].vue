<script setup lang="ts">
import { Bars4Icon } from "@heroicons/vue/24/solid/index.js";
import { Square2StackIcon } from "@heroicons/vue/24/outline/index.js";
import Classroom from "~~/models/Classroom";
import VBreadcrumb from "~/components/folder/VBreadcrumb.vue";
import { useClassroomStore } from "~/store/classroom";

const classroomStore = useClassroomStore();

const props = defineProps<{
  classroom: Classroom;
}>();

const route = useRoute();

const folderId = computed(() => {
  return route.params.folder
    ? route.params.folder
    : props.classroom.root_folder.id;
});

await classroomStore.fetchCurrentFolder(folderId.value as string);
</script>

<template>
  <div>
    <div
      class="mt-6 block items-center justify-start text-2xl font-medium leading-6 text-storm-dark sm:flex sm:truncate"
    >
      <div class="flex min-w-0 flex-1 items-center justify-between">
        <VBreadcrumb
          :path="classroomStore.currentFolder.path"
          :root="{ id: classroom.root_folder.id, name: classroom.name }"
        />

        <div class="flex">
          <div
            class="mr-4 flex cursor-pointer divide-x-2 rounded-sm border text-storm-dark"
          >
            <span
              class="p-2 hover:scale-110"
              :class="{ 'bg-gray-200': classroomStore.displayMode === 'list' }"
              @click="classroomStore.displayMode = 'list'"
            >
              <Bars4Icon class="h-5 w-5"
            /></span>
            <span
              class="p-2 hover:scale-110"
              :class="{ 'bg-gray-200': classroomStore.displayMode === 'block' }"
              @click="classroomStore.displayMode = 'block'"
              ><Square2StackIcon class="h-5 w-5"
            /></span>
          </div>
        </div>
      </div>
    </div>
    <folder-content
      :folder="classroomStore.currentFolder"
      :mode="classroomStore.displayMode"
      @show-folder-modal="classroomStore.showFolderCreationModal = true"
      @show-deck-modal="classroomStore.showDeckCreationModal = true"
    />
  </div>
</template>
