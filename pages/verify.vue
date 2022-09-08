<script setup lang="ts">
import { useFetchAPI } from "#imports";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
const key = useRoute().query.key;

const { error } = await useFetchAPI<never, { message: string }>("/v1/verify", {
  method: "POST",
  useFetch: true,
  body: {
    key,
  },
});
</script>

<template>
  <div class="mx-auto mt-10 h-screen md:mt-0">
    <div
      class="mx-auto flex h-screen w-full max-w-xs flex-col items-center justify-center"
    >
      <nuxt-img
        src="/images/Logo.svg"
        class="-mt-10 h-32"
        alt="StudyStorm Logo"
      />
      <div v-if="error" class="mt-4 w-full text-center text-lg">
        <p>
          <span class="font-medium text-storm-red">Error</span> :
          {{ error.data.message }}
        </p>
      </div>
      <div v-else>
        <p>
          <span class="font-medium text-green-500">Success</span> : Verified
        </p>
      </div>
      <div>
        <NuxtLink
          to="/login"
          class="mt-10 flex justify-start text-sm text-storm-dark hover:text-storm-blue hover:underline focus:outline-storm-blue"
        >
          <ArrowLeftIcon class="mr-2 h-6 w-6 text-storm-dark" />{{
            $t("app.reset.returnLogin")
          }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
