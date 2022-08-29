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
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" autocomplete="email" required
                    class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                <div class="mt-1">
                  <input id="password" name="password" type="password" autocomplete="current-password" required
                    class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="flex items-center justify-end">
                <div class="text-sm">
                  <a href="#" class="font-medium text-black hover:text-indigo-500"> Forgot your password? </a>
                </div>
              </div>

              <div>
                <button type="submit"
                  class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign
                  in</button>
              </div>
            </form>
            <div class="flex items-center justify-start mt-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-black hover:text-indigo-500"> Don't have an account ? Sign up </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex-1 hidden lg:block background-image" :style="{backgroundImage:`url(${img})`}">
    </div>
  </div>
</template>
<style scoped>
  .background-image{
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
</style>
<script setup lang="ts">
  const img = '/images/post-it-for-login.png'
</script>