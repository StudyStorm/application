<script setup lang="ts">
import useGitRev from "~/composables/useGitRev";
const rev = useGitRev();
</script>

<template>
  <footer class="bg-gray-50 p-4 dark:bg-gray-800 sm:p-6">
    <div class="mx-auto max-w-screen-xl">
      <div class="flex items-center justify-between">
        <div class="md:mb-0">
          <NuxtLink to="/" title="Landing page link" class="flex items-center">
            <nuxt-img
              src="/images/Logo.svg"
              class="mr-3 h-6 from-cyan-500 to-blue-500 sm:h-9"
              alt="StudyStorm Logo"
              loading="lazy"
            />
            <span
              class="self-center whitespace-nowrap font-[ZwoDrei] text-xl font-semibold"
              >StudyStorm</span
            >
          </NuxtLink>
        </div>
        <NuxtLink
          to="https://www.youtube.com/watch?v=6uQC1ZmN5mw"
          target="_blank"
          title="Release Trailer | StudyStorm"
          class="mt-0 text-gray-500 hover:text-gray-900 dark:hover:text-white sm:justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
            ></path>
            <polygon
              points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
            ></polygon>
          </svg>
        </NuxtLink>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center"
          >{{
            $t("landing.footer.copyright", { year: new Date().getFullYear() })
          }}
        </span>
        <NuxtLink
          to="https://github.com/StudyStorm"
          target="_blank"
          title="GitHub page link"
          class="mt-4 flex space-x-2 text-gray-500 hover:text-gray-900 dark:hover:text-white sm:mt-0 sm:justify-center"
        >
          <span class="text-sm sm:text-center"> Version: {{ rev }}</span>
          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
