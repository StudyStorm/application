<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3CenterLeftIcon,
  AcademicCapIcon,
  HomeIcon,
} from "@heroicons/vue/24/solid/index.js";
import { useNuxtApp } from "#app";

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const { t } = useI18n();

const auth = useAuth();

const classrooms = [
  "Heig",
  "EPFL",
  "UNIL",
  "MIT",
  "Harvard",
  "Boston",
  "Oxford",
];

const navigation = [
  {
    name: t("app.sideNav.home"),
    href: "/dashboard",
    icon: HomeIcon,
    current: true,
  },
  {
    name: t("app.sideNav.class"),
    href: "",
    icon: AcademicCapIcon,
    current: false,
    options: true,
  },
];

//Modal for room creation
const datas = ref({
  className: "",
  visibility: true,
});

//const err = ref<null | any>(null);
const showButton = ref(false);
const sidebarOpen = ref(false);
const showModal = ref(false);

async function create() {
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
  showModal.value = false;
  console.log(datas.value);
}

async function closeModal() {
  resetField();
  showModal.value = false;
}

function resetField() {
  datas.value.className = "";
  datas.value.visibility = true;
}

async function createClassroom() {
  sidebarOpen.value = false;
  showModal.value = true;
}
</script>
<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600/75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex shrink-0 items-center px-4">
                <nuxt-img
                  src="/images/Logo.svg"
                  class="mr-3 h-6 sm:h-9"
                  alt="StudyStorm Logo"
                />
                <span
                  class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold"
                  >StudyStorm</span
                >
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <NuxtLink
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.href"
                      :class="[
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </NuxtLink>
                    <div class="flex justify-start">
                      <button
                        class="mx-6 mt-4 flex justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        @click="createClassroom"
                      >
                        {{ $t("app.createClassroom.title") }}
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 shrink-0" aria-hidden="true"></div>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4"
    >
      <div class="flex shrink-0 items-center px-6">
        <nuxt-img
          src="/images/Logo.svg"
          class="mr-3 h-6 from-cyan-500 to-blue-500 sm:h-9"
          alt="StudyStorm Logo"
        />
        <span
          class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold"
          >StudyStorm</span
        >
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="relative inline-block px-3 text-left">
          <div>
            <MenuButton
              class="group mt-2 w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <span class="flex w-full items-center justify-between">
                <span
                  class="flex min-w-0 items-center justify-between space-x-3"
                >
                  <nuxt-img
                    class="h-10 w-10 shrink-0 rounded-full bg-gray-300"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="flex min-w-0 flex-1 flex-col">
                    <span class="truncate text-sm font-medium text-gray-900"
                      >{{ $auth.user.first_name }}
                      {{ $auth.user.last_name }}</span
                    >
                    <span class="truncate text-sm text-gray-500">{{
                      $auth.user.email
                    }}</span>
                  </span>
                </span>
                <ChevronDownIcon
                  class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute inset-x-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/profile"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >View profile
                  </NuxtLink>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    @click="auth.logout()"
                    >Logout</NuxtLink
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <div
              v-for="(item, index) in navigation"
              :key="index"
              class="flex items-center"
            >
              <NuxtLink
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-48',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
              <div
                v-if="item.options"
                class="p-4"
                @click="showButton = !showButton"
              >
                <ChevronUpIcon
                  v-if="showButton"
                  class="h-5 w-5 shrink-0 text-gray-400 hover:cursor-pointer hover:text-blue-600"
                  aria-hidden="true"
                />
                <ChevronDownIcon
                  v-else
                  class="h-5 w-5 shrink-0 text-gray-400 hover:cursor-pointer hover:text-blue-600"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div
              v-if="showButton"
              class="flex flex-col justify-center rounded-lg bg-gray-200 px-6 py-2 shadow-2xl"
            >
              <a
                v-for="(classroom, index) in classrooms"
                :key="index"
                href="/myClassroom"
                class="rounded-md pl-4 hover:bg-gray-300"
                >{{ classroom }}
              </NuxtLink>
              <button
                class="mb-2 mt-4 flex justify-center rounded-md border border-transparent bg-indigo-700 px-1 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue"
                @click="createClassroom"
              >
                {{ $t("app.createClassroom.title") }}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div
      class="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white lg:hidden"
    >
      <button
        type="button"
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1"></div>
        <div class="flex items-center">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open user menu</span>
                <nuxt-img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/profile"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >View profile
                    </NuxtLink>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      @click="auth.logout()"
                      >Logout</NuxtLink
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="showModal">
    <template #title> {{ $t("app.createClassroom.title") }} </template>
    <template #content>
      <form action="#">
        <label for="name" class="block text-sm font-medium text-gray-700">
          {{ $t("app.createClassroom.name") }}
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="datas.className"
            name="name"
            type="text"
            required
            autocomplete="off"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mt-1">
          <input
            id="isPublic"
            v-model="datas.visibility"
            name="isPublic"
            type="checkbox"
            value="isPublic"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600"
          />
          <label
            for="isPublic"
            class="ml-2 text-sm font-medium text-gray-900"
            >{{ $t("app.createClassroom.public") }}</label
          >
        </div>
      </form>
    </template>
    <template #footer>
      <button
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="create"
      >
        {{ $t("app.createClassroom.create") }}
      </button>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.createClassroom.cancel") }}
      </button>
    </template>
  </Modal>
</template>
