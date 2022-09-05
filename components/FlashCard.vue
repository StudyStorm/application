<script setup lang="ts">
import { PropType } from "vue";
import Card from "~~/models/Card";

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const isFlipped = ref(false);

const question = computed(() => {
  return props.card.content.question;
});

const answer = computed(() => {
  return props.card.content.answers[0].label;
});

const reset = () => {
  isFlipped.value = false;
};

defineExpose({
  reset,
});
</script>

<template>
  <FlippableCard v-model="isFlipped" :is-flippable="true">
    <template #cardFront>
      <span class="p-6 text-center text-xl font-bold text-storm-dark">
        {{ question }}
      </span>
    </template>
    <template #cardBack>
      <span
        v-if="isFlipped"
        class="p-6 text-center text-xl font-bold text-storm-dark"
      >
        {{ answer }}
      </span>
    </template>
  </FlippableCard>
</template>
