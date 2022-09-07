<script setup lang="ts">
import { computed, useAttrs, useForm } from "#imports";

defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
const form = useForm();
const attrs = useAttrs();
const error = computed(() =>
  form?.errors?.errors.find((e) => e.field === attrs?.name)
);
</script>

<template>
  <div class="relative" @click="$refs.input.focus()">
    <input
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :class="{ error }"
      @input="updateValue"
    />
    <slot />
  </div>
  <div v-if="error" class="text-sm text-storm-red">
    {{ error.message }}
  </div>
</template>

<style scoped>
.error {
  @apply text-storm-red border-storm-red ring-1 ring-storm-red;
}
</style>
