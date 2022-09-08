<script setup lang="ts">
import Card from "~/models/Card";

const props = defineProps<{
  card: Card;
}>();

const isFlipped = ref(false);

const question = computed(() => {
  return props.card.content.question;
});

const answer = computed(() => {
  return props.card.content.answers[0].label;
});

defineExpose({
  reset: () => {
    isFlipped.value = false;
  },
  toggle: () => {
    isFlipped.value = !isFlipped.value;
  },
});
</script>

<template>
  <FlippableCard v-model="isFlipped" :is-flippable="true">
    <div class="flex h-full items-center justify-center">
      <span class="p-6 text-center text-xl font-bold text-storm-dark">
        {{ question }}
      </span>
    </div>
    <template #back>
      <div class="flex h-full items-center justify-center">
        <span class="p-6 text-center text-xl font-bold text-storm-dark">
          {{ answer }}
        </span>
      </div>
    </template>
  </FlippableCard>
</template>
