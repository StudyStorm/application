<script setup lang="ts">
defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const textareaRef = ref<HTMLTextAreaElement>();
const updateValue = (event) => {
  event.target.style.height = "auto";
  event.target.style.height = `${event.target.scrollHeight + 2}px`;
  emit("update:modelValue", event.target.value);
};
onMounted(() => {
  const textarea = unrefElement(textareaRef);
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight + 2}px`;
});
</script>

<template>
  <textarea
    ref="textareaRef"
    class="resize-none"
    v-bind="$attrs"
    :value="modelValue"
    rows="1"
    @input="updateValue"
  />
</template>
