<script setup lang="ts">
const img = "/images/post-it-for-login.png";
const router = useRouter();
const credentials = ref({
  email: "",
  password: "",
});

const err = ref<null | any>(null);

async function login() {
  const { data: answer } = await useFetchAPI("/login", {
    method: "POST",
    body: credentials.value,
    initialCache: false,
  });
  err.value = !answer.value;
  if (answer.value) {
    router.push("/dashboard");
  }
}

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
              class="mr-3 h-16 text-storm-dark"
              alt="StudyStorm Logo"
            />
            <span
              class="self-center whitespace-nowrap font-[ZwoDrei] text-2xl font-semibold"
              >StudyStorm</span
            >
          </div>
          <h2 class="mt-6 text-2xl font-bold tracking-tight text-storm-dark">
            {{ $t("app.login.title") }}
          </h2>
        </div>
        <div
          v-if="err"
          class="relative mt-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span class="block sm:inline">{{ $t("app.login.errorLogin") }}</span>
        </div>
        <div>
          <div class="mt-4">
            <form class="space-y-6" @submit.prevent="login">
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
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  <input
                    id="password"
                    v-model="credentials.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="flex items-center justify-end">
                <div class="text-sm">
                  <NuxtLink
                    to="/forgottenPassword"
                    class="font-medium text-storm-dark hover:text-storm-blue"
                  >
                    {{ $t("app.login.forgotPassword") }}
                  </NuxtLink>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {{ $t("app.login.signInButton") }}
                </button>
              </div>
            </form>
            <div class="mt-6 flex items-center justify-start">
              <div class="text-sm">
                <p class="mt-2 text-center text-sm text-gray-600">
                  {{ $t("app.login.noAccount") }}
                  <NuxtLink
                    to="/register"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {{ $t("app.login.registerHere") }}
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
      :style="{ backgroundImage: `url(${img})` }"
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
