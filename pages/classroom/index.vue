<script setup lang="ts">
import { ChevronRightIcon, Bars4Icon } from "@heroicons/vue/24/solid/index.js";
import { useClassroomStore } from "~/store/classroom";
import { Square2StackIcon } from "@heroicons/vue/24/outline/index.js";
import { useMagicKeys, whenever, useFocus } from "@vueuse/core";

const { t } = useI18n();

const classroomStore = useClassroomStore();

await classroomStore.fetchClassrooms();

const { alt_k } = useMagicKeys({
  passive: false,
});

const displayStyle = ref("row");

const target = ref();

const tableHeaders = [
  "app.classrooms.table.name",
  "app.classrooms.table.permissions",
  "app.classrooms.table.nbMembers",
];

const currentPage = ref(classroomStore.filteredClassrooms.meta.current_page);

const changePage = (page: number) => {
  if (page > 0 && page <= classroomStore.filteredClassrooms.meta.last_page) {
    currentPage.value = page;
    classroomStore.fetchClassrooms(currentPage.value);
  }
};

function color(id: string) {
  return `background-color: hsl(${id
    .split("")
    .reduce((a, b) => (a + b.charCodeAt(0)) % 360, 0)}, 100%, 80%)`;
}

onMounted(() => {
  classroomStore.fetchLastVisited();
});

whenever(alt_k, () => {
  useFocus(target, { initialValue: true });
});
</script>

<template>
  <div>
    <div
      class="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-storm-dark sm:truncate">
          {{ $t("app.classrooms.title") }}
        </h1>
      </div>
    </div>
    <div class="p-4 sm:px-6 lg:px-8">
      <h1
        class="mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.classrooms.recentClassrooms") }}
      </h1>

      <div class="s-grid">
        <ClientOnly>
          <ClassroomCard
            v-for="classroom in classroomStore.lastVisitedClassrooms"
            :key="classroom.id"
            :classroom="classroom"
          />
        </ClientOnly>
      </div>

      <h1
        class="mt-8 mb-4 text-lg font-medium leading-6 text-storm-dark sm:truncate"
      >
        {{ $t("app.classrooms.browseClassrooms") }}
      </h1>

      <div class="flex items-center justify-between">
        <div class="flex">
          <div>
            <div class="relative mt-1 flex items-center">
              <input
                ref="target"
                v-model="classroomStore.searchFilter"
                name="searchClassroom"
                type="text"
                class="block w-full rounded-md border-gray-300 pr-12 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
                :placeholder="$t('app.classrooms.search')"
                @input="changePage(currentPage)"
              />
              <div
                class="absolute inset-y-0 right-0 hidden py-1.5 pr-1.5 sm:flex"
              >
                <kbd
                  class="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400"
                  >Alt+K</kbd
                >
              </div>
            </div>
          </div>
          <classroom-modal v-slot="{ open }">
            <button
              type="submit"
              class="mt-1 ml-2 inline-flex items-center justify-center rounded-md border border-transparent bg-storm-darkblue py-1 px-2 text-xs font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              @click="open"
            >
              {{ $t("app.classrooms.addClassroom") }}
            </button>
          </classroom-modal>
        </div>

        <div
          class="hidden cursor-pointer divide-x-2 rounded-sm border text-storm-dark sm:flex"
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

      <!-- Projects list (mobile) -->
      <div class="mt-10 sm:hidden">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-storm-dark">
            {{ $t("app.classrooms.table.title") }}
          </h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li
            v-for="classroom in classroomStore.classrooms"
            :key="classroom.id"
          >
            <NuxtLink
              :to="`/classroom/${classroom.id}`"
              class="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span class="relative mx-1 inline-flex h-2 w-2">
                  <span
                    class="h-2 w-2 rounded-full shadow-sm ring-1 ring-gray-300"
                    :style="color(classroom.id)"
                  ></span>
                  <span
                    class="absolute inline-flex h-full w-full rounded-full opacity-100 group-hover:animate-ping"
                    :style="color(classroom.id)"
                  ></span>
                </span>
                <span class="truncate text-sm font-medium leading-6">
                  {{ classroom.name }}
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
                  <span class="lg:pl-2">{{ t(header) }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(classroom, i) in classroomStore.classrooms"
                :key="classroom.id"
                :class="{ 'bg-gray-100': i % 2 === 0 }"
              >
                <td class="whitespace-nowrap px-6 py-3 text-sm font-medium">
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <NuxtLink
                      :to="`classroom/${classroom.id}`"
                      class="truncate hover:text-gray-600"
                    >
                      <span class="relative mx-1 inline-flex h-2 w-2">
                        <span
                          class="h-2 w-2 rounded-full shadow-sm ring-1 ring-gray-300"
                          :style="color(classroom.id)"
                        ></span>
                        <span
                          class="absolute inline-flex h-full w-full rounded-full opacity-100 group-hover:animate-ping"
                          :style="color(classroom.id)"
                        ></span>
                      </span>
                      {{ classroom.name }}
                    </NuxtLink>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <span class="truncate hover:text-gray-600">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        :class="[
                          classroom.permissions.is_member
                            ? 'bg-gray-500 '
                            : 'bg-gray-400 ',
                        ]"
                        >{{
                          classroom.permissions.is_member
                            ? $t("app.classrooms.table.isMember")
                            : $t("app.classrooms.table.notMember")
                        }}</span
                      >
                      <span
                        v-if="classroom.permissions.is_member"
                        class="ml-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        :class="[
                          classroom.permissions.write
                            ? 'bg-storm-blue'
                            : 'bg-storm-dark',
                        ]"
                        >{{
                          classroom.permissions.write
                            ? `${$t("app.classrooms.table.read")} & ${$t(
                                "app.classrooms.table.write"
                              )}`
                            : $t("app.classrooms.table.read")
                        }}</span
                      >
                    </span>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <span class="truncate hover:text-gray-600">
                      <span>
                        {{ classroom.nb_members }}
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            <ClassroomCard
              v-for="classroom in classroomStore.classrooms"
              :key="classroom.id"
              :classroom="classroom"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-center">
        <s-paginator
          :current-page="currentPage"
          :last="classroomStore.pagination.last_page"
          :max-visible="5"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>
