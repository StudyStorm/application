<script setup lang="ts">
const router = useRouter();
const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
const confirmPassword = ref("");
const err = ref<null | any>(null);

const updatePicture = (picture: File) => {
  console.log("Register got", picture);
};

async function register() {
  if (userInformation.value.password === confirmPassword.value) {
    const { data: answer, error } = await useFetchAPI("/v1/register", {
      method: "POST",
      body: userInformation.value,
      initialCache: false,
    });

    err.value = !answer.value;

    if (answer.value) {
      router.push("/verify");
    }
  }
}

definePageMeta({
  layout: "nosidebar",
  auth: "guest",
});
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-storm-dark"
      >
        {{ $t("app.register.title") }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="register">
          <div class="mx-auto h-48 w-48 text-center">
            <div class="mb-4">
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
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              <input
                id="password"
                v-model="userInformation.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              {{ $t("app.register.labels.confirmPassword") }}
            </label>
            <div class="mt-1">
              <input
                id="confirm_password"
                v-model="confirmPassword"
                name="confirm_password"
                type="password"
                autocomplete="curent-password"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {{ $t("app.register.buttons.register") }}
            </button>
          </div>
          <div class="text-sm">
            <p class="mt-2 text-center text-sm text-gray-600">
              {{ $t("app.register.text.alreadyHaveAccount") }}
              <a
                href="login"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ $t("app.register.text.loginHere") }}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
