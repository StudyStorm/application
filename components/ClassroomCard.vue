<script setup lang="ts">
import Classroom from "~/models/Classroom";

const props = defineProps<{
  classroom: Classroom;
}>();

const color = computed((): string => {
  return `background-color: hsl(${props.classroom.id
    .split("")
    .reduce((a, b) => (a + b.charCodeAt(0)) % 360, 0)}, 100%, 80%)`;
});
</script>

<template>
  <NuxtLink
    class="relative flex items-center truncate rounded-lg border border-gray-200 p-4 shadow-md transition hover:scale-105 hover:bg-gray-50"
    :to="`/classroom/${classroom.id}`"
  >
    <div class="mr-4">
      <span class="relative mx-1 inline-flex h-3 w-3">
        <span
          class="absolute inline-flex h-full w-full rounded-full opacity-100 group-hover:animate-ping"
          :style="color"
        ></span>
        <span
          class="h-3 w-3 rounded-full shadow-sm ring-1 ring-gray-300"
          :style="color"
        ></span>
      </span>
    </div>
    <div class="w-4/5 items-center justify-between">
      <div class="truncate">
        <h5 class="truncate text-lg font-bold tracking-tight text-storm-dark">
          {{ classroom.name }}
        </h5>
      </div>

      <div class="mt-1.5 space-x-1 text-sm">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
          :class="[
            classroom.visibility === 'public' ? 'bg-green-500 ' : 'bg-red-500 ',
          ]"
          >{{
            classroom.visibility === "public"
              ? $t("app.classrooms.table.public")
              : $t("app.classrooms.table.private")
          }}</span
        >
        <span
          class="inline-flex items-center rounded-full bg-gray-500 px-2.5 py-0.5 text-xs font-medium text-white"
          >{{ classroom.nb_members }} {{ $t("app.classrooms.table.member")
          }}{{ classroom.nb_members > 1 ? "s" : "" }}</span
        >
      </div>
    </div>
  </NuxtLink>
</template>
