<script setup lang="ts">
import {
  XCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/solid/index.js";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";

const props = defineProps<{
  resendToken?: string;
}>();

const status = ref({
  err: false,
  success: false,
});

async function sendToken() {
  const { error } = await useFetchAPI("/v1/resend", {
    method: "POST",
    body: {
      key: props.resendToken,
    },
  });

  if (error) {
    status.value.err = true;
    console.log(error);
  } else {
    status.value.success = true;
  }
}
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center bg-white shadow-[0_0_50px_0_rgba(0,0,0,0.75)] sm:h-fit sm:rounded-lg sm:py-14 sm:px-4"
  >
    <div
      class="mx-auto flex h-full w-full max-w-xs flex-col items-center justify-center px-4"
    >
      <nuxt-img
        src="/images/Logo.svg"
        class="h-24 w-full"
        alt="StudyStorm Logo"
      />
      <div class="mt-4 w-full text-center text-3xl font-bold tracking-normal">
        {{ $t("app.verify.title") }}
      </div>
      <div class="mt-10 w-full text-base text-storm-dark">
        {{ $t("app.verify.firstParagraph") }}
      </div>
      <br />
      <p class="w-full text-base text-storm-dark">
        {{ $t("app.verify.secondParagraph") }}
      </p>
      <div class="mt-8 flex items-center justify-center text-sm">
        <div>
          <p class="text-center text-gray-600">
            {{ $t("app.verify.noEmail") }}
          </p>
          <button
            class="inline-block font-medium text-storm-darkblue hover:text-storm-blue focus:outline-storm-blue"
            @click="sendToken"
          >
            {{ $t("app.verify.clickResend") }}
          </button>
        </div>
      </div>
      <div v-if="status.err" class="mt-6 rounded-md bg-red-50 p-4">
        <div class="flex items-center">
          <div class="shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
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
      <div v-if="status.success" class="mt-6 rounded-md bg-green-50 p-4">
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
