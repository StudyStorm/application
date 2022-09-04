<script>
export default {
  layout: "error",
  props: ["error"], // you can set a custom layout for the error page
};

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
                    to="/dashboard"
                    class="w-full text-2xl font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
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
      :style="{ backgroundImage: `url(/public/images/background_1.jpg)` }"
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
