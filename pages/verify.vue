<script setup lang="ts">
import { useFetchAPI } from "#imports";

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
const key = useRoute().query.key;

const { error } = await useFetchAPI("/v1/verify", {
  method: "POST",
  body: {
    key,
  },
});
</script>

<template>
  <div class="mx-auto mt-10 h-screen md:mt-0">
    <div class="mx-auto flex h-full w-full max-w-xs flex-col md:justify-center">
      <nuxt-img
        src="/images/Logo.svg"
        class="h-16 w-full"
        alt="StudyStorm Logo"
      />
      <div class="mt-10 w-full text-center text-xl">
        <span v-if="error">Error</span>
        <span v-else>Success</span>
      </div>
    </div>
  </div>
</template>
