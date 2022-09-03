<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";
definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});

function sendEmail() {
  console.log("L'envoie de l'email est encore à faire");
}

definePageMeta({
  layout: "nosidebar",
});
</script>

<template>
  <div class="mx-auto mt-10 h-screen md:mt-0">
    <div class="mx-auto flex h-full w-full max-w-xs flex-col md:justify-center">
      <NuxtLink
        to="/login"
        class="flex justify-start text-storm-dark hover:underline"
      >
        <ArrowLeftIcon class="mr-2 h-6 w-6" />{{ $t("app.reset.returnLogin") }}
      </NuxtLink>
      <div class="mt-16 w-full text-4xl font-bold">
        {{ $t("app.forgottenPassword.title") }}
      </div>
      <div class="mt-16 w-full">
        <form @submit.prevent="sendEmail">
          <label for="email" class="mb-2 block text-sm text-gray-900">{{
            $t("app.forgottenPassword.email")
          }}</label>
          <input
            id="email"
            type="email"
            name="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
            required
          />
          <button
            type="submit"
            class="mt-4 w-full rounded-lg bg-storm-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-storm-darkblue focus:outline-none focus:ring-4"
          >
            {{ $t("app.forgottenPassword.submit") }}
          </button>
        </form>
      </div>
      <NuxtLink
        to="#"
        class="mt-16 w-full hover:text-storm-blue hover:underline"
        >{{ $t("app.verify.noEmail") }}</NuxtLink
      >
    </div>
  </div>
</template>
