<script setup lang="ts">
import { Menu, MenuItem, MenuButton } from "@headlessui/vue";
import { GlobeAltIcon } from "@heroicons/vue/24/outline/index.js";

const country = ref({
  fr: "/images/langIcons/fr.svg",
  en: "/images/langIcons/gb.svg",
});
</script>

<template>
  <Menu as="div" class="text-left">
    <div>
      <MenuButton>
        <GlobeAltIcon class="h-6 w-6 text-storm-dark" />
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
        class="absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <s-lang-switcher v-slot="{ locale, active, onClick }" class="">
            <MenuItem>
              <span
                :class="[
                  active ? 'font-bold' : '',
                  'hover:cursor-pointer flex justify-start items-center px-2 py-2 text-sm text-storm hover:bg-gray-100 hover:text-gray-900 text-gray-700',
                ]"
                @click="onClick"
              >
                <div class="h-6 w-6">
                  <NuxtImg
                    :src="country[locale.code]"
                    class="h-6 w-6 rounded-full"
                  />
                </div>
                <div class="ml-2">
                  {{ locale.name }}
                </div>
              </span>
            </MenuItem>
          </s-lang-switcher>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
