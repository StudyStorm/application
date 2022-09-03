<script setup lang="ts">
import { XCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid/index.js";
import useAuth from "~/composables/useAuth";
import SPasswordInput from "~/components/SPasswordInput.vue";
import SLangSwitcher from "~/components/SLangSwitcher.vue";

const router = useRouter();
const auth = useAuth();

const credentials = ref({
  email: "",
  password: "",
});

const bgImg = `/images/background_${Math.round(Math.random())}.jpg`;

const error = ref<boolean>(false);

async function login() {
  await auth
    .login({
      body: credentials.value,
    })
    .catch((e) => {
      console.log(e);
      error.value = true;
    })
    .then((e) => {
      console.log(e);
      router.push("/dashboard");
    });
}

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
</script>

<template>
  <div class="flex h-screen justify-between">
    <div
      class="z-40 flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 lg:shadow-[0_0_50px_0_rgba(0,0,0,0.75)] xl:px-24 2xl:px-32"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center justify-center">
            <nuxt-img
              src="/images/Logo.svg"
              class="h-24 text-storm-dark 2xl:h-28"
              alt="StudyStorm Logo"
            />
          </div>
          <h2
            class="mt-4 text-center text-xl font-bold tracking-tight text-storm-dark md:text-2xl"
          >
            {{ $t("app.login.title") }}
          </h2>
        </div>
        <div>
          <div class="mx-4 mt-6 md:mx-2 md:mt-4">
            <form class="space-y-6 2xl:space-y-8" @submit.prevent="login">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  {{ $t("app.login.email") }}
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    v-model="credentials.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    :placeholder="$t('app.login.placeholder.email')"
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  {{ $t("app.login.password") }}
                </label>
                <div class="mt-1">
                  <s-password-input
                    id="password"
                    v-model="credentials.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    :placeholder="$t('app.login.placeholder.password')"
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="error" class="rounded-md bg-red-50 p-4">
                <div class="flex items-center">
                  <div class="shrink-0">
                    <XCircleIcon
                      class="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-red-800">
                      {{ $t("app.login.errorLogin") }}
                    </p>
                  </div>
                  <div class="ml-auto pl-3">
                    <div class="-m-1 md:-m-1.5">
                      <button
                        type="button"
                        class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        @click="error = false"
                      >
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end">
                <div class="text-sm">
                  <NuxtLink
                    to="/forgottenPassword"
                    class="font-medium text-storm-dark hover:text-storm-blue focus:outline-storm-blue"
                  >
                    {{ $t("app.login.forgotPassword") }}
                  </NuxtLink>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md border border-transparent bg-storm-blue py-3 text-base font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 md:py-2 md:text-sm"
                >
                  {{ $t("app.login.signInButton") }}
                </button>
              </div>
            </form>
            <div class="mt-6 flex items-center justify-center">
              <div class="text-sm">
                <p class="mt-2 text-center text-sm text-gray-600">
                  {{ $t("app.login.noAccount") }}
                  <NuxtLink
                    to="/register"
                    class="font-medium text-storm-darkblue hover:text-storm-blue focus:outline-storm-blue"
                  >
                    <span class="inline-block">{{
                      $t("app.login.registerHere")
                    }}</span>
                  </NuxtLink>
                </p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-center">
              <s-lang-switcher
                v-slot="{ locale, active, onClick }"
                class="mt-6 flex items-center justify-center"
              >
                <span
                  class="mx-1 cursor-pointer"
                  :class="{ 'font-extrabold': active }"
                  @click="onClick"
                  >{{ locale.name }}</span
                >
              </s-lang-switcher>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative hidden flex-1 lg:block"
      :style="{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }"
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
