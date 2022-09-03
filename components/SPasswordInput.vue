<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid/index.js";

defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const isShown = ref(false);
const fieldType = computed(() => {
  return isShown.value ? "text" : "password";
});

const icon = computed(() => {
  return isShown.value ? EyeIcon : EyeSlashIcon;
});
</script>
<template>
  <label class="relative m-0 border-none">
    <span class="absolute inset-y-0 right-3 flex items-center pl-2">
      <component
        :is="icon"
        class="h-5 w-5 cursor-pointer text-storm-blue"
        aria-hidden="true"
        @click="isShown = !isShown"
      />
    </span>
    <input
      class="pr-9"
      v-bind="$attrs"
      :type="fieldType"
      :value="modelValue"
      @input="updateValue"
    />
  </label>
</template>
