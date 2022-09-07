<script setup lang="ts">
import {
  XCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/solid/index.js";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";

const email = ref("");
const status = ref({
  err: false,
  success: false,
});

const bgImg = `/images/background_${Math.round(Math.random())}.jpg`;

async function sendEmail() {
  const { error } = await useFetchAPI("/v1/forgot-password", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
    }),
  });

  if (error) {
    status.value.err = true;
    console.log(error);
  } else {
    status.value.success = true;
  }
}

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
</script>

<template>
  <div class="flex h-screen justify-between">
    <div
      class="relative hidden flex-1 lg:block"
      :style="{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }"
    ></div>
    <div
      class="z-40 flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 lg:shadow-[0_0_50px_0_rgba(0,0,0,0.75)] xl:px-24 2xl:px-32"
    >
      <div class="mx-4 mt-6 md:mx-2 md:mt-4">
        <div
          class="mx-auto flex w-full max-w-xs flex-col space-y-8 md:justify-center"
        >
          <NuxtLink
            to="/login"
            class="flex justify-start text-storm-dark hover:text-storm-blue hover:underline focus:outline-storm-blue"
          >
            <ArrowLeftIcon class="mr-2 h-6 w-6 text-storm-dark" />{{
              $t("app.reset.returnLogin")
            }}
          </NuxtLink>
          <div class="w-full text-4xl font-bold">
            {{ $t("app.forgottenPassword.title") }}
          </div>
          <div class="w-full">
            <form @submit.prevent="sendEmail">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
                >{{ $t("app.forgottenPassword.email") }}</label
              >
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
                required
                :placeholder="$t('app.forgottenPassword.placeholder.email')"
              />
              <button
                type="submit"
                class="mt-8 flex w-full justify-center rounded-md border border-transparent bg-storm-blue py-3 text-base font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 md:py-2 md:text-sm"
              >
                {{ $t("app.forgottenPassword.submit") }}
              </button>
              <div v-if="status.err" class="mt-6 rounded-md bg-red-50 p-4">
                <div class="flex items-center">
                  <div class="shrink-0">
                    <XCircleIcon
                      class="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-xs font-medium text-red-800">
                      {{ $t("app.forgottenPassword.error") }}
                    </p>
                  </div>
                  <div class="ml-auto pl-3">
                    <div class="-m-1 md:-m-1.5">
                      <button
                        type="button"
                        class="inline-flex rounded-md bg-red-50 p-1.5 text-storm-red hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        @click="status.err = false"
                      >
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="status.success"
                class="mt-6 rounded-md bg-green-50 p-4"
              >
                <div class="flex items-center">
                  <div class="shrink-0">
                    <CheckCircleIcon
                      class="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-xs font-medium text-green-800">
                      {{ $t("app.forgottenPassword.success") }}
                    </p>
                  </div>
                  <div class="ml-auto pl-3">
                    <div class="-m-1 md:-m-1.5">
                      <button
                        type="button"
                        class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        @click="status.success = false"
                      >
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-8 flex items-center justify-center text-sm">
                <div>
                  <p class="text-center text-gray-600">
                    {{ $t("app.forgottenPassword.noEmail") }}
                  </p>
                  <button
                    class="inline-block font-medium text-storm-darkblue hover:text-storm-blue focus:outline-storm-blue"
                    @click="email !== '' ? sendEmail : ''"
                  >
                    {{ $t("app.forgottenPassword.clickResend") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
