<script setup lang="ts">
import { FormError } from "~/types/app";
import { useFetchAPI } from "#imports";

const router = useRouter();

const newPassword = ref<string>(null);

const bgImg = `/images/background_${Math.round(Math.random())}.jpg`;

const errors = ref<FormError | null>(null);

const key = useRoute().query.key;

async function resetPassword() {
  const { error } = await useFetchAPI<never, FormError>("/v1/reset-password", {
    method: "POST",
    body: {
      key,
      password: newPassword.value,
    },
  });

  if (error) {
    errors.value = error.data;
    console.log("error", error.data);
  } else {
    router.push("/login");
  }
}

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
</script>

<template>
  <div
    class="flex h-screen flex-col justify-center"
    :style="{
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }"
  >
    <div class="mx-auto w-full max-w-md">
      <div
        class="flex h-screen flex-col items-center justify-center bg-white shadow-[0_0_50px_0_rgba(0,0,0,0.75)] sm:h-fit sm:rounded-lg sm:py-10 sm:px-4"
      >
        <div class="mb-4 flex flex-col items-center justify-center space-x-2">
          <nuxt-img
            src="/images/Logo.svg"
            class="inline-block h-8 text-storm-dark lg:h-10"
            alt="StudyStorm Logo"
          />
          <h2
            class="text-center text-2xl font-bold tracking-tight text-storm-dark"
          >
            {{ $t("app.reset.title") }}
          </h2>
        </div>

        <s-form
          class="w-full max-w-sm space-y-2 px-7"
          :errors="errors"
          @submit.prevent="resetPassword"
        >
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.reset.password") }}
            </label>
            <div class="mt-1">
              <s-password-input
                id="password"
                v-model="newPassword"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                :placeholder="$t('app.register.placeholder.password')"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>
          <div class="pt-4">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-storm-blue py-3 text-base font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 md:py-2 md:text-sm"
            >
              {{ $t("app.reset.button") }}
            </button>
          </div>
        </s-form>
      </div>
    </div>
  </div>
</template>
