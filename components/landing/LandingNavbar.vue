<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onClickOutside } from "@vueuse/core";
import { GlobeAltIcon } from "@heroicons/vue/24/outline/index.js";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const links = [
  {
    name: "landing.navbar.links.about",
    url: "#about",
  },
  {
    name: "landing.navbar.links.teams",
    url: "#team",
  },
];

let showMobileMenu = ref(false);

const target = ref(null);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

onClickOutside(target, () => (showMobileMenu.value = false));
</script>

<template>
  <nav
    ref="target"
    class="sticky top-0 border-b border-b-gray-100 px-4 py-2.5 text-storm-dark backdrop-blur lg:px-6"
  >
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto"
    >
      <NuxtLink to="/" title="Landing page link" class="flex items-center">
        <nuxt-img
          src="/images/Logo.svg"
          class="h-6 mr-3 from-cyan-500 to-blue-500 sm:h-9"
          alt="StudyStorm Logo"
        />
        <span
          class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold"
          >StudyStorm</span
        >
      </NuxtLink>
      <div class="flex items-center lg:order-2">
        <NuxtLink
          v-slot="{ navigate: navigateToLogin }"
          custom
          to="/login"
          rel="noopener"
        >
          <button
            class="mr-2 rounded-lg bg-storm-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2"
            @click="navigateToLogin"
          >
            {{ $t("landing.navbar.start") }}
          </button>
        </NuxtLink>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">{{ $t("landing.navbar.openMenu") }}</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu-2"
        class="items-center justify-between w-full lg:order-1 lg:flex lg:w-auto"
        :class="{ hidden: !showMobileMenu }"
      >
        <ul
          class="flex flex-col mt-4 space-y-2 font-medium lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0"
        >
          <li v-for="(link, index) in links" :key="index">
            <a
              :href="link.url"
              aria-current="page"
              rel="noopener noreferrer"
              class="block py-2 pl-3 pr-4 rounded-lg text-storm-dark hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:bg-transparent lg:p-0 lg:hover:bg-transparent hover:lg:text-gray-500 lg:focus:ring-0"
              >{{ $t(link.name) }}
            </a>
          </li>
          <li
            class="block py-2 pl-3 pr-4 rounded-lg text-storm-dark hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 lg:bg-transparent lg:p-0 lg:focus:ring-0"
          >
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton>
                  <GlobeAltIcon class="w-6 h-6 text-storm-dark" />
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
                  class="absolute z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg -right-10 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <s-lang-switcher
                      v-slot="{ locale, active, onClick }"
                      class=""
                    >
                      <MenuItem>
                        <span
                          :class="[
                            active ? 'font-bold' : '',
                            'block px-4 py-2 text-sm text-storm hover:bg-gray-100 hover:text-gray-900 text-gray-700',
                          ]"
                          @click="onClick"
                          >
                          {{ locale.name }}</span
                        >
                      </MenuItem>
                    </s-lang-switcher>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </li>
          <!-- <s-lang-switcher
                v-slot="{ locale, active, onClick }"
                class="flex items-center justify-centermt-6"
              >
                <span
                  class="pl-2 mx-1 cursor-pointer"
                  :class="{ 'font-extrabold': active }"
                  @click="onClick"
                  >{{ locale.name }}</span
                >
              </s-lang-switcher> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
