<script setup lang="ts">
import { XCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid/index.js";
defineProps<{
  errors: Array<{
    rule: string;
    field: string;
    message: string;
  }>;
}>();
</script>

<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex items-center">
      <div class="shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-red-800">
          {{ $t("app.login.errorLogin") }}
        </p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-m-1 md:-m-1.5">
          <button
            type="button"
            class="inline-flex rounded-md bg-red-50 p-1.5 text-storm-red hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
          >
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
