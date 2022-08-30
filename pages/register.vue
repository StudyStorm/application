<script setup lang="ts">
  
  import useFetchAPI from "../composables/useFetchAPI";
  
  const userInformation = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const err = ref<null | any>(null);

  async function register(){
    console.log(userInformation);
    /*const { data: answer, error } = await useFetchAPI('/register', {
      method: 'POST',
      body: (userInformation.value),
      initialCache: false
    });
    
    err.value = !answer.value;*/
  }

</script>
  
<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900"
      >
        {{ $t("app.register.title") }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="register" class="space-y-6" method="POST">
          <div class="w-48 h-48 mx-auto text-center previewer">
            <div class="mb-4">
              <label class="mt-6 cursor-pointer">
                <img
                  class="object-cover object-center w-48 h-48 mx-auto rounded-full"
                  src="/icons/default_profile_picture.svg"
                  alt="Avatar Upload"
                />
                <input
                  type="file"
                  class="hidden"
                />
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
                name="firstname"
                v-model="userInformation.firstName"
                type="text"
                autocomplete="firstname"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                name="lastname"
                v-model="userInformation.lastName"
                type="text"
                autocomplete="lastname"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                name="email"
                v-model="userInformation.email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                name="password"
                v-model="userInformation.password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                name="confirm_password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ $t("app.register.buttons.register") }}
            </button>
          </div>
          <div class="text-sm">
            <p class="mt-2 text-sm text-center text-gray-600">
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