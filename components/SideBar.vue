<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Pagination } from "~/types/app";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3CenterLeftIcon,
  AcademicCapIcon,
  HomeIcon,
} from "@heroicons/vue/24/solid/index.js";

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
import Classroom from "~/models/Classroom";
import { useSidebarStore } from "~/store/sidebar";

const { t } = useI18n();

const auth = useAuth();

const route = useRoute();

const path = computed(() => route.path);

const sidebarStore = useSidebarStore();

await sidebarStore.fetchPinnedClassrooms();

const navigation = ref([
  {
    name: t("app.sideNav.home"),
    translateName: "app.sideNav.home",
    href: "/dashboard",
    icon: HomeIcon,
    current: true,
    hasDropdown: false,
  },
  {
    name: t("app.sideNav.class"),
    translateName: "app.sideNav.class",
    href: "/classroom",
    icon: AcademicCapIcon,
    current: false,
    options: true,
    hasDropdown: true,
    dropped: true,
    classrooms: computed(() => sidebarStore.pinnedClassrooms),
  },
]);

//Modal for room creation
const datas = ref({
  className: "",
  visibility: true,
});

const sidebarOpen = ref(false);
const showModal = ref(false);

function color(id: string) {
  return `background-color: hsl(${id
    .split("")
    .reduce((a, b) => (a + b.charCodeAt(0)) % 360, 0)}, 100%, 80%)`;
}

async function closeModal() {
  resetField();
  showModal.value = false;
}

function resetField() {
  datas.value.className = "";
  datas.value.visibility = true;
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
                <NuxtLink
                  to="/dashboard"
                  title="Dashboard"
                  class="flex items-center"
                  @click="sidebarOpen = false"
                >
                  <nuxt-img
                    src="/images/Logo.svg"
                    class="mr-3 h-6 sm:h-9"
                    alt="StudyStorm Logo"
                  />
                  <span
                    class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold text-storm-dark"
                    >{{ $t("app.title") }}</span
                  >
                </NuxtLink>
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2" aria-label="nav">
                  <div
                    v-for="item in navigation"
                    :key="item.name"
                    class="relative cursor-pointer select-none"
                  >
                    <NuxtLink
                      :to="item.href"
                      class="flex items-center justify-between border border-transparent hover:border-gray-200 hover:bg-gray-50"
                      :class="[
                        path === item.href
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      ]"
                      :aria-current="path === item.href ? 'page' : undefined"
                      @click="sidebarOpen = false"
                    >
                      <div class="relative flex items-center">
                        <component
                          :is="item.icon"
                          :class="[
                            path === item.href
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6',
                          ]"
                          aria-hidden="true"
                        />
                        {{ $t(item.translateName) }}
                      </div>
                    </NuxtLink>
                    <ChevronUpIcon
                      v-if="item.hasDropdown && item.dropped"
                      class="shrink-1 absolute top-1 right-1 float-right h-8 w-8 rounded px-2 text-gray-400"
                      :class="[
                        path === '/classroom'
                          ? 'cursor-pointer bg-gray-300 text-storm-blue'
                          : 'cursor-pointer bg-gray-200 text-storm-blue',
                      ]"
                      aria-hidden="true"
                      @click="item.dropped = !item.dropped"
                    />
                    <ChevronDownIcon
                      v-if="item.hasDropdown && !item.dropped"
                      class="absolute top-1 right-1 float-right h-8 w-8 shrink-0 rounded px-2 text-gray-400"
                      :class="[
                        path === '/classroom'
                          ? 'cursor-pointer bg-gray-300 text-storm-blue'
                          : 'cursor-pointer bg-gray-200 text-storm-blue',
                      ]"
                      aria-hidden="true"
                      @click="item.dropped = !item.dropped"
                    />
                    <div v-if="item.hasDropdown && item.dropped" class="mt-0.5">
                      <!-- TODO: change this to match the classroom type -->
                      <!-- TODO: Change the link to /classroom/:id -->
                      <NuxtLink
                        v-for="subitem in item.classrooms"
                        :key="subitem.id"
                        class="group mt-0.5 flex cursor-pointer items-center rounded-md border border-transparent p-2 pl-4 text-sm font-medium text-storm-darkblue hover:bg-gray-50"
                        :class="[
                          path === `/classroom/${subitem.id}`
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 ',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        ]"
                        :to="`/classroom/${subitem.id}`"
                        @click="sidebarOpen = false"
                      >
                        <span class="relative mr-2 flex h-3 w-3">
                          <span
                            class="h-3 w-3 rounded-full shadow-sm ring-1 ring-gray-300"
                            :style="color(subitem.id)"
                          ></span>
                          <span
                            class="absolute inline-flex h-full w-full rounded-full opacity-100 group-hover:animate-ping"
                            :style="color(subitem.id)"
                          ></span>
                        </span>
                        {{ subitem.name }}
                      </NuxtLink>
                    </div>
                  </div>
                </nav>
                <!-- Bouton langue -->
                <SButtonLangSwitch
                  class="ml-4 mt-4 text-gray-500 hover:text-gray-700"
                >
                  <span
                    class="ml-3 rounded-md text-sm font-medium text-gray-700"
                  >
                    {{ $t("app.sideNav.lang") }}
                  </span>
                </SButtonLangSwitch>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 shrink-0" aria-hidden="true"></div>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- Static sidebar for desktop -->
    <div
      class="hidden backdrop-blur lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4"
    >
      <div class="flex shrink-0 items-center px-6">
        <NuxtLink to="/dashboard" title="Dashboard" class="flex items-center">
          <nuxt-img
            src="/images/Logo.svg"
            class="mr-3 h-6 from-cyan-500 to-blue-500 sm:h-9"
            alt="StudyStorm Logo"
          />
          <span
            class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold text-storm-dark"
            >{{ $t("app.title") }}</span
          >
        </NuxtLink>
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="relative inline-block px-3 text-left">
          <div>
            <MenuButton
              v-if="$auth.user"
              class="group mt-2 w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <span class="flex w-full items-center justify-between">
                <span
                  class="flex min-w-0 items-center justify-between space-x-3"
                >
                  <nuxt-img
                    class="h-10 w-10 shrink-0 rounded-full bg-gray-300"
                    :src="$auth.user.picture_url"
                    alt=""
                  />
                  <span class="flex min-w-0 flex-1 flex-col">
                    <span class="truncate text-sm font-medium text-gray-900"
                      >{{ $auth.user.first_name }}
                      {{ $auth.user.last_name }}
                    </span>
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
                    >{{ $t("app.navbar.profile") }}
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/inbox"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >{{ $t("app.inbox.title") }}
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
                    >{{ $t("app.navbar.logout") }}
                  </NuxtLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <nav class="mt-6 px-3" aria-label="nav">
          <div class="space-y-1">
            <div
              v-for="item in navigation"
              :key="item.name"
              class="relative cursor-pointer select-none"
            >
              <NuxtLink
                :to="item.href"
                class="flex items-center justify-between border border-transparent hover:border-gray-200 hover:bg-gray-50"
                :class="[
                  path === item.href
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                :aria-current="path === item.href ? 'page' : undefined"
              >
                <div class="flex items-center">
                  <component
                    :is="item.icon"
                    :class="[
                      path === item.href
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ $t(item.translateName) }}
                </div>
              </NuxtLink>
              <ChevronUpIcon
                v-if="item.hasDropdown && item.dropped"
                class="absolute top-1 right-1 float-right h-8 w-8 shrink-0 rounded px-2 text-gray-400 hover:cursor-pointer hover:bg-gray-300 hover:text-storm-blue"
                aria-hidden="true"
                @click="item.dropped = !item.dropped"
              />
              <ChevronDownIcon
                v-if="item.hasDropdown && !item.dropped"
                class="absolute top-1 right-1 float-right h-8 w-8 shrink-0 rounded px-2 text-gray-400 hover:cursor-pointer hover:bg-gray-300 hover:text-storm-blue"
                aria-hidden="true"
                @click="item.dropped = !item.dropped"
              />
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="item.hasDropdown && item.dropped" class="mt-0.5">
                  <NuxtLink
                    v-for="subitem in item.classrooms"
                    :key="subitem.id"
                    class="group mt-0.5 flex cursor-pointer items-center rounded-md border border-transparent p-2 pl-3 text-sm font-medium text-storm-darkblue hover:border-gray-200 hover:bg-gray-50"
                    :class="[
                      path === `/classroom/${subitem.id}`
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 ',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    ]"
                    :to="`/classroom/${subitem.id}`"
                  >
                    <span class="relative mr-2 flex h-2.5 w-2.5">
                      <span
                        class="h-2.5 w-2.5 rounded-full shadow-sm ring-1 ring-gray-300"
                        :style="color(subitem.id)"
                      ></span>
                      <span
                        class="absolute inline-flex h-full w-full rounded-full opacity-100 group-hover:animate-ping"
                        :style="color(subitem.id)"
                      ></span>
                    </span>
                    {{ subitem.name }}
                  </NuxtLink>
                </div>
              </transition>
            </div>
          </div>
        </nav>

        <!-- Bouton pour changer la langue -->
        <SButtonLangSwitch class="ml-5 mt-4 text-gray-500 hover:text-gray-700">
          <span class="ml-3 rounded-md text-sm font-medium text-gray-700">
            {{ $t("app.sideNav.lang") }}
          </span>
        </SButtonLangSwitch>
      </div>
    </div>
    <div
      class="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white lg:hidden"
    >
      <button
        type="button"
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-storm-blue lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">{{ $t("app.navbar.openMenu") }}</span>
        <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1"></div>
        <div class="flex items-center">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                v-if="$auth.user"
                class="flex max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2"
              >
                <span class="sr-only"
                  >Open user menu {{ $t("app.navbar.openMenu") }}</span
                >
                <nuxt-img
                  class="h-8 w-8 rounded-full"
                  :src="$auth.user.picture_url"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition name="fade">
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
                      >{{ $t("app.navbar.profile") }}
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/inbox"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >{{ $t("app.inbox.title") }}
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
                      >{{ $t("app.navbar.logout") }}
                    </NuxtLink>
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
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
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
      >
        {{ $t("app.createClassroom.create") }}
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.createClassroom.cancel") }}
      </button>
    </template>
  </Modal>
</template>
