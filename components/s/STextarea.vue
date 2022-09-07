<script setup lang="ts">
defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  event.target.style.height = "auto";
  event.target.style.height = `${event.target.scrollHeight + 2}px`;
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <textarea
    class="resize-none"
    v-bind="$attrs"
    :value="modelValue"
    rows="1"
    @input="updateValue"
  />
</template>
