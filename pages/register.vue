<script setup lang="ts">
import SFileInputPreview from "~/components/s/SFileInputPreview.vue";
import { FormError } from "~/types/app";
import { useFetchAPI } from "#imports";

const picture = ref<File>(null);

const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const bgImg = `/images/background_${Math.round(Math.random())}.jpg`;

const updatePicture = (newPicture: File) => {
  picture.value = newPicture;
};

const errors = ref<FormError | null>(null);

const showVerifyStep = ref(false);

const resendToken = ref<string>(null);

async function register() {
  const formData = getFormData(userInformation.value);

  if (picture.value) {
    formData.append("profilePicture", picture.value);
  }

  const { data, error } = await useFetchAPI<
    {
      message: string;
      resend_token: string;
    },
    FormError
  >("/v1/register", {
    method: "POST",
    body: formData,
  });

  if (error) {
    errors.value = error.data;
    console.log("error", error.data);
  } else {
    resendToken.value = data.resend_token;
    showVerifyStep.value = true;
    console.log("log data: " + data);
    console.log("log data: " + resendToken.value);
  }
}

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

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
        v-if="!showVerifyStep"
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
            {{ $t("app.register.title") }}
          </h2>
        </div>

        <s-form
          class="w-full max-w-sm space-y-2 px-7"
          :errors="errors"
          @submit.prevent="register"
        >
          <div class="mx-auto h-24 w-24 text-center">
            <s-file-input-preview
              class="mt-6 cursor-pointer"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              @valid-file="updatePicture"
            />
          </div>

          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.firstname") }}
            </label>
            <div class="mt-1">
              <s-input
                id="firstName"
                v-model="userInformation.firstName"
                name="firstName"
                type="text"
                required
                autocomplete="given-name"
                :placeholder="$t('app.register.placeholder.firstname')"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.lastname") }}
            </label>
            <div class="mt-1">
              <s-input
                id="lastName"
                v-model="userInformation.lastName"
                name="lastName"
                type="text"
                autocomplete="family-name"
                required
                :placeholder="$t('app.register.placeholder.lastname')"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t("app.register.labels.email") }}
            </label>
            <div class="mt-1">
              <s-input
                id="email"
                v-model="userInformation.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :placeholder="$t('app.register.placeholder.email')"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.password") }}
            </label>
            <div class="mt-1">
              <s-password-input
                id="password"
                v-model="userInformation.password"
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
              {{ $t("app.register.buttons.register") }}
            </button>
          </div>
          <div class="text-sm">
            <p class="pt-2 text-center text-sm text-gray-600">
              {{ $t("app.register.text.alreadyHaveAccount") }}
              <NuxtLink
                to="/login"
                class="font-medium text-storm-darkblue hover:text-storm-blue focus:outline-storm-blue"
              >
                <span class="inline-block">
                  {{ $t("app.register.text.loginHere") }}
                </span>
              </NuxtLink>
            </p>
          </div>
        </s-form>
      </div>
      <RegisterInfo v-else :resend-token="resendToken" />
    </div>
  </div>
</template>
