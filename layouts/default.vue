<script setup>
import { ref } from "vue";
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

import {
  XMarkIcon,
  ChevronDownIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/solid/index.js";

const navigation = [
  { name: "Home", href: "", icon: null, current: true },
  { name: "My classrooms", href: "", icon: null, current: false },
];

const sidebarOpen = ref(false);
</script>
<template>
  <div class="min-h-full">
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
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
              class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white"
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
                <div class="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex items-center flex-shrink-0 px-4">
                <img
                  class="w-auto h-8"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=purple&shade=500"
                  alt="Workflow"
                />
              </div>
              <div class="flex-1 h-0 mt-5 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
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
                    </a>
                  </div>
                  <div class="mt-8">
                    <h3
                      id="mobile-teams-headline"
                      class="px-3 text-sm font-medium text-gray-500"
                    >
                      Teams
                    </h3>
                    <div
                      class="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="mobile-teams-headline"
                    >
                      <!-- <a
                        v-for="team in teams"
                        :key="team.name"
                        :href="team.href"
                        class="flex items-center px-3 py-2 text-base font-medium leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span
                          :class="[
                            team.bgColorClass,
                            'w-2.5 h-2.5 mr-4 rounded-full',
                          ]"
                          aria-hidden="true"
                        />
                        <span class="truncate">
                          {{ team.name }}
                        </span>
                      </a> -->
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100"
    >
      <div class="flex items-center flex-shrink-0 px-6">
        <img
          class="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=purple&shade=500"
          alt="Workflow"
        />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 h-0 mt-6 overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="relative inline-block px-3 text-left">
          <div>
            <MenuButton
              class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
            >
              <span class="flex items-center justify-between w-full">
                <span
                  class="flex items-center justify-between min-w-0 space-x-3"
                >
                  <img
                    class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="flex flex-col flex-1 min-w-0">
                    <span class="text-sm font-medium text-gray-900 truncate"
                      >Jessy Schwarz</span
                    >
                    <span class="text-sm text-gray-500 truncate"
                      >@jessyschwarz</span
                    >
                  </span>
                </span>
                <ChevronDownIcon
                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
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
              class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >View profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Notifications</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Get desktop app</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Support</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Logout</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <nav class="px-3 mt-6">
          <div class="space-y-1">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
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
            </a>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <!-- Search header -->
      <div
        class="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden"
      >
        <button
          type="button"
          class="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="w-6 h-6" aria-hidden="true" />
        </button>
        <div class="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
          <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                  <MagnifyingGlassIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 rounded-full"
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
                  class="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >View profile</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Settings</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Notifications</a
                      >
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Get desktop app</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Support</a
                      >
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Logout</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <!-- Page title & actions -->
        <div
          class="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        >
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Home
            </h1>
          </div>
          <div class="flex mt-4 sm:mt-0 sm:ml-4">
            <button
              type="button"
              class="inline-flex items-center order-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
            >
              Share
            </button>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm order-0 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
          </div>
        </div>
        <!-- Pinned projects -->
        <!-- <div class="px-4 mt-6 sm:px-6 lg:px-8">
          <h2 class="text-sm font-medium text-gray-900">Pinned Projects</h2>
          <ul
            role="list"
            class="grid grid-cols-1 gap-4 mt-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            <li
              v-for="project in pinnedProjects"
              :key="project.id"
              class="relative flex col-span-1 rounded-md shadow-sm"
            >
              <div
                :class="[
                  project.bgColorClass,
                  'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
                ]"
              >
                {{ project.initials }}
              </div>
              <div
                class="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md"
              >
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <a
                    href="#"
                    class="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {{ project.title }}
                  </a>
                  <p class="text-gray-500">
                    {{ project.totalMembers }} Members
                  </p>
                </div>
                <Menu as="div" class="flex-shrink-0 pr-2">
                  <MenuButton
                    class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="w-5 h-5" aria-hidden="true" />
                  </MenuButton>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="absolute z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-10 top-3 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            ]"
                            >View</a
                          >
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            ]"
                            >Removed from pinned</a
                          >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            ]"
                            >Share</a
                          >
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </li>
          </ul>
        </div> -->

        <!-- Projects list (only on smallest breakpoint) -->
        <div class="mt-10 sm:hidden">
          <div class="px-4 sm:px-6">
            <h2 class="text-sm font-medium text-gray-900">Projects</h2>
          </div>
          <ul
            role="list"
            class="mt-3 border-t border-gray-200 divide-y divide-gray-100"
          >
            <!-- <li v-for="project in projects" :key="project.id">
              <a
                href="#"
                class="flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6"
              >
                <span class="flex items-center space-x-3 truncate">
                  <span
                    :class="[
                      project.bgColorClass,
                      'w-2.5 h-2.5 flex-shrink-0 rounded-full',
                    ]"
                    aria-hidden="true"
                  />
                  <span class="text-sm font-medium leading-6 truncate">
                    {{ project.title }}
                    {{ " " }}
                    <span class="font-normal text-gray-500 truncate"
                      >in {{ project.team }}</span
                    >
                  </span>
                </span>
                <ChevronRightIcon
                  class="w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li> -->
          </ul>
        </div>

        <!-- Projects table (small breakpoint and up) -->
        <div class="hidden mt-8 sm:block">
          <div
            class="inline-block min-w-full align-middle border-b border-gray-200"
          >
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
                <!-- <tr v-for="project in projects" :key="project.id">
                  <td
                    class="w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap"
                  >
                    <div class="flex items-center space-x-3 lg:pl-2">
                      <div
                        :class="[
                          project.bgColorClass,
                          'flex-shrink-0 w-2.5 h-2.5 rounded-full',
                        ]"
                        aria-hidden="true"
                      />
                      <a href="#" class="truncate hover:text-gray-600">
                        <span>
                          {{ project.title }}
                          {{ " " }}
                          <span class="font-normal text-gray-500"
                            >in {{ project.team }}</span
                          >
                        </span>
                      </a>
                    </div>
                  </td>
                  <td class="px-6 py-3 text-sm font-medium text-gray-500">
                    <div class="flex items-center space-x-2">
                      <div class="flex flex-shrink-0 -space-x-1">
                        <img
                          v-for="member in project.members"
                          :key="member.handle"
                          class="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                          :src="member.imageUrl"
                          :alt="member.name"
                        />
                      </div>
                      <span
                        v-if="project.totalMembers > project.members.length"
                        class="flex-shrink-0 text-xs font-medium leading-5"
                        >+{{
                          project.totalMembers - project.members.length
                        }}</span
                      >
                    </div>
                  </td>
                  <td
                    class="hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap"
                  >
                    {{ project.lastUpdated }}
                  </td>
                  <td
                    class="px-6 py-3 text-sm font-medium text-right whitespace-nowrap"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
