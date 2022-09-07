<script setup lang="ts">
import { createForm } from "~/composables/useForm";
import { FormError } from "~/types/app";
const props = defineProps<{
  errors: FormError;
}>();
createForm(props);
</script>

<template>
  <form v-bind="$attrs">
    <slot />
  </form>
</template>
