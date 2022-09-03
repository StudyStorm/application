<script setup lang="ts">
import Card from "~~/models/Card";

const props = defineProps({
  card: {
    type: Card,
    required: true,
  },
});

const question = computed(() => {
  return props.card.content.question;
});

const answer = computed(() => {
  return props.card.content.answers[0].label;
});

const reset = () => {
  console.log("reset");
};

defineExpose({
  reset,
});
</script>

<template>
  <FlippableCard :is-flippable="true">
    <template #cardFront>
      <span class="p-6 text-center text-xl font-bold text-storm-dark">
        {{ question }}
      </span>
    </template>
    <template #cardBack>
      <span class="p-6 text-center text-xl font-bold text-storm-dark">
        {{ answer }}
      </span>
    </template>
  </FlippableCard>
</template>
