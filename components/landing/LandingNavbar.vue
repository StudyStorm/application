<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onClickOutside } from "@vueuse/core";
import useFetchAPI from "../../composables/useFetchAPI";

const { t } = useI18n();

const links = [
  {
    name: t("landing.navbar.links.about"),
    url: "#about",
  },
  {
    name: t("landing.navbar.links.teams"),
    url: "#team",
  },
];

let showMobileMenu = ref(false);

const target = ref(null);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const testApiInteraction = async () => {
  const { data, error } = await useFetchAPI<{ hello: string }>("/");
  if (error.value) {
    console.log(error.value);
    return;
  }
  alert(data.value.hello);
};

onClickOutside(target, () => (showMobileMenu.value = false));
</script>

<template>
  <nav
    ref="target"
    class="sticky top-0 border-b border-b-gray-100 px-4 lg:px-6 py-2.5 backdrop-blur text-storm-dark"
  >
    <div
      class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
    >
      <NuxtLink to="/" title="Landing page link" class="flex items-center">
        <nuxt-img
          src="/images/Logo.svg"
          class="mr-3 h-6 sm:h-9 text-gradient-to-r from-cyan-500 to-blue-500"
          alt="StudyStorm Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap font-[ZwoDrei]"
          >StudyStorm</span
        >
      </NuxtLink>
      <div class="flex items-center lg:order-2">
        <button
          href="#"
          class="text-white bg-storm-blue hover:bg-primary-800 hover:bg-storm-darkblue focus:ring-4 focus:ring-storm-darkblue/50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
          @click="testApiInteraction"
        >
          {{ $t("landing.navbar.start") }}
        </button>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        :class="{ hidden: !showMobileMenu }"
      >
        <ul
          class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 space-y-2 lg:space-y-0 lg:mt-0"
        >
          <li v-for="(link, index) in links" :key="index">
            <a
              :href="link.url"
              aria-current="page"
              :title="link.name"
              rel="noopener noreferrer"
              class="block py-2 pr-4 pl-3 text-storm-dark bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 lg:hover:bg-transparent hover:text-gray-500 hover:lg:text-gray-500 focus:outline-none focus:ring-2 lg:focus:ring-0 focus:ring-gray-200 rounded-lg hover:bg-gray-100"
              >{{ link.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
