<script setup lang="ts">
const img = '/images/post-it-for-login.png'
const router = useRouter();
const credentials = ref({
  email: '',
  password: ''
})
const err = ref<null | any>(null);
async function login() {
  const { data: answer, error } = await useFetchAPI('/login', {
    method: 'POST',
    body: (credentials.value),
    initialCache: false
  });
  err.value = !answer.value;
  if (answer.value) {
    router.push('/');
  }
}
</script>

<template>
  <div class="flex justify-between h-screen">
    <div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <div class="flex items-center justify-center">
            <nuxt-img src="/images/Logo.svg" class="h-16 mr-3 text-gradient-to-r from-cyan-500 to-blue-500"
              alt="StudyStorm Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap font-[ZwoDrei]">StudyStorm</span>
          </div>
          <h2 class="mt-6 text-2xl font-bold tracking-tight text-gray-900">
            {{  $t("app.login.title")  }}
          </h2>
        </div>
        <div v-if="err" class="relative px-4 py-3 mt-6 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
          <span class="block sm:inline">{{ $t("app.login.errorLogin")}}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>

        <div>
          <div class="mt-2">
            <form @submit.prevent="login" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> {{  $t("app.login.email")  }} </label>
                <div class="mt-1">
                  <input id="email" name="email" v-model="credentials.email" type="email" autocomplete="email" required
                    class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700"> {{  $t("app.login.password")  }}
                </label>
                <div class="mt-1">
                  <input id="password" name="password" type="password" v-model="credentials.password"
                    autocomplete="current-password" required
                    class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="flex items-center justify-end">
                <div class="text-sm">
                  <a href="#" class="font-medium text-black hover:text-storm-blue"> {{  $t("app.login.forgotPassword")  }}
                  </a>
                </div>
              </div>

              <div>
                <button type="submit"
                  class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-storm-blue hover:bg-storm-darkblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {{  $t("app.login.signInButton")  }}
                </button>
              </div>
            </form>
            <div class="flex items-center justify-start mt-6">
              <div class="text-sm">
                <a href="/register" class="font-medium text-black hover:text-storm-blue"> {{  $t("app.login.noAccount")  }} </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex-1 hidden lg:block background-image" :style="{ backgroundImage: `url(${img})` }">
    </div>
  </div>
</template>
<style scoped>
.background-image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>