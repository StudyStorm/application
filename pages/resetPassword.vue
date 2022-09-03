<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";
const datas = ref({
  password: "",
  confirmPassword: "",
});

let passwordNotMatching = computed(() => {
  return datas.value.password !== datas.value.confirmPassword;
});

let passwordIsTooShort = computed(() => {
  return datas.value.password.length < 8;
});

async function sendNewPassword() {
  // const { data: answer, error } = await useFetchAPI('/resetPassword', {
  //     method: 'POST',
  //     body: (datas.value),
  //     initialCache: false
  // });
  // err.value = !answer.value;
  //     if (answer.value) {
  //         router.push('/dashboard');
  //     }
}

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
</script>

<template>
  <section>
    <div
      class="mx-auto flex flex-col items-center justify-center px-6 py-2 md:h-screen lg:py-0"
    >
      <div class="w-full p-6 sm:max-w-md sm:p-8 md:mt-0">
        <NuxtLink
          to="/login"
          class="flex justify-start text-storm-dark hover:underline"
        >
          <ArrowLeftIcon class="mr-2 h-6 w-6" />{{
            $t("app.reset.returnLogin")
          }}
        </NuxtLink>
        <div class="mt-6 mb-1 text-center text-2xl text-black md:my-24">
          {{ $t("app.reset.title") }}
        </div>
        <!-- <div v-if="passwordNotMatching == true"
                    class="relative px-4 py-3 mt-6 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                    <span class="block sm:inline">Erreur backend</span>
                </div> -->
        <form
          class="mt-6 space-y-4 md:space-y-5"
          @submit.prevent="sendNewPassword"
        >
          <div>
            <div class="mb-2 block text-sm text-gray-900">
              {{ $t("app.reset.email") }}
            </div>
            <input
              type="email"
              disabled
              value="marinelepen@gmail.com"
              class="block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-900 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm text-gray-900">{{
              $t("app.reset.password")
            }}</label>
            <div class="relative">
              <SPasswordInput
                id="password"
                v-model="datas.password"
                name="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label for="confirmPw" class="mb-2 block text-sm text-gray-900">{{
              $t("app.reset.confirmPassword")
            }}</label>
            <div class="relative">
              <SPasswordInput
                id="confirmPw"
                v-model="datas.confirmPassword"
                name="confirmPw"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div
            v-if="passwordNotMatching"
            class="relative mt-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span class="block sm:inline">{{
              $t("app.reset.pwNotTheSame")
            }}</span>
          </div>
          <div
            v-else
            class="relative mt-6 rounded border border-green-400 bg-green-200 px-4 py-3 text-green-500"
            role="alert"
          >
            <span class="block sm:inline">{{
              $t("app.reset.pwAreTheSame")
            }}</span>
          </div>
          <div
            v-if="passwordIsTooShort"
            class="relative mt-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span class="block sm:inline">{{
              $t("app.reset.pwTooShort")
            }}</span>
          </div>
          <div
            v-else
            class="relative mt-6 rounded border border-green-400 bg-green-200 px-4 py-3 text-green-500"
            role="alert"
          >
            <span class="block sm:inline">{{
              $t("app.reset.pwLongEnough")
            }}</span>
          </div>

          <button
            v-if="passwordIsTooShort || passwordNotMatching"
            type="submit"
            disabled
            class="w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            {{ $t("app.reset.button") }}
          </button>

          <button
            v-else
            type="submit"
            class="w-full rounded-lg bg-storm-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-storm-darkblue focus:outline-none focus:ring-4"
          >
            {{ $t("app.reset.button") }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
