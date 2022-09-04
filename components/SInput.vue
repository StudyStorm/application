<script setup lang="ts">
import { FieldError, FormError } from "~/types/app";
import SForm from "~/components/SForm.vue";
import { useAttrs, useParent } from "#imports";
import { Ref } from "vue";

defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
const error: Ref<FieldError | null> = (() => {
  const attrs = useAttrs();
  if (!attrs.name) return ref(null);
  const form = useParent(SForm);
  return computed(() =>
    (form?.props?.errors as FormError)?.errors.find(
      (e) => e.field === attrs?.name
    )
  );
})();
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
  <div class="text-sm text-red-500">
    {{ error?.message }}
  </div>
</template>

<style scoped>
.error {
  @apply text-red-500 border-red-500 ring-1 ring-red-500;
}
</style>
