<script setup lang="ts">
const router = useRouter();
const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
const err = ref<boolean>(false);
const bgImg = `/images/background_${Math.round(Math.random())}.jpg`;

const updatePicture = (picture: File) => {
  console.log("Register got", picture);
};

async function register() {
  // TODO: class store
  const { error } = await useFetchAPI("/v1/register", {
    method: "POST",
    body: userInformation.value,
  });

  if (error.value) {
    err.value = true;
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
        class="flex h-screen flex-col items-center justify-center bg-white sm:h-fit sm:rounded-lg sm:py-10 sm:px-4 sm:shadow-[0_0_50px_0_rgba(0,0,0,0.75)]"
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

        <form class="w-full max-w-sm space-y-2 px-7" @submit.prevent="register">
          <div class="mx-auto h-24 w-24 text-center">
            <div>
              <label class="mt-6 cursor-pointer">
                <FileInputPrewiever @valid-file="updatePicture" />
              </label>
            </div>
          </div>

          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.firstname") }}
            </label>
            <div class="mt-1">
              <input
                id="firstname"
                v-model="userInformation.firstName"
                name="firstname"
                type="text"
                autocomplete="firstname"
                required
                :placeholder="$t('app.register.placeholder.firstname')"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-storm-blue focus:outline-none focus:ring-storm-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.lastname") }}
            </label>
            <div class="mt-1">
              <input
                id="lastname"
                v-model="userInformation.lastName"
                name="lastname"
                type="text"
                autocomplete="lastname"
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
              <input
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
        </form>
      </div>
    </div>
  </div>
</template>
