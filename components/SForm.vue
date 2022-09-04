<script setup lang="ts">
import { FormError } from "~/types/app";

defineProps<{
  errors: FormError;
}>();
</script>

<template>
  <form v-bind="$attrs">
    <slot />
  </form>
</template>
