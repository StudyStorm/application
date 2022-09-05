<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true,
  },
});

definePageMeta({
  layout: "nosidebar",
});
</script>

<template>
  <div class="flex h-screen justify-between">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center justify-center">
            <nuxt-img
              src="/images/Logo.svg"
              class="mr-3 h-16 text-4xl text-storm-dark"
              alt="StudyStorm Logo"
            />
            <span
              class="self-center whitespace-nowrap font-[ZwoDrei] text-4xl font-semibold"
              >StudyStorm</span
            >
          </div>
          <div
            v-if="error.statusCode == 404"
            class="mt-6 text-center text-2xl font-bold tracking-tight text-storm-dark"
          >
            {{ $t("app.error.error404") }}
          </div>
          <div
            v-else
            class="mt-6 text-center text-2xl font-bold tracking-tight text-storm-dark"
          >
            {{ $t("app.error.standardError") }}
          </div>
        </div>
        <div>
          <div class="mt-4">
            <div class="mt-6 flex items-center justify-center text-center">
              <div class="text-sm">
                <p class="mt-2 text-center text-sm text-gray-600">
                  <NuxtLink
                    class="flex w-full justify-center rounded-md border border-transparent bg-storm-blue px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 md:py-2 md:text-sm"
                    to="/dashboard"
                  >
                    {{ $t("app.error.linkToHome") }}
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="background-image relative hidden flex-1 lg:block"
      :style="{ backgroundImage: `url(/images/background_1.jpg)` }"
    ></div>
  </div>
</template>

<style scoped>
.background-image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
