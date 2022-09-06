<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onClickOutside } from "@vueuse/core";

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
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between"
    >
      <NuxtLink to="/" title="Landing page link" class="flex items-center">
        <nuxt-img
          src="/images/Logo.svg"
          class="mr-3 h-6 from-cyan-500 to-blue-500 sm:h-9"
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
          class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">{{ $t("landing.navbar.openMenu") }}</span>
          <svg
            class="h-6 w-6"
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
            class="hidden h-6 w-6"
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
        class="w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
        :class="{ hidden: !showMobileMenu }"
      >
        <ul
          class="mt-4 flex flex-col space-y-2 font-medium lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0"
        >
          <li v-for="(link, index) in links" :key="index">
            <a
              :href="link.url"
              aria-current="page"
              rel="noopener noreferrer"
              class="block rounded-lg py-2 pl-3 pr-4 text-storm-dark hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:bg-transparent lg:p-0 lg:hover:bg-transparent hover:lg:text-gray-500 lg:focus:ring-0"
              >{{ $t(link.name) }}
            </a>
          </li>
          <li
            class="block rounded-lg py-2 pl-3 pr-4 text-storm-dark hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 lg:bg-transparent lg:p-0 lg:focus:ring-0"
          >
            <SButtonLangSwitch></SButtonLangSwitch>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
