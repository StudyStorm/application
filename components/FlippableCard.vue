<script setup lang="ts">
const props = defineProps({
  isFlippable: Boolean,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isFlipped = ref(false);

function flip() {
  emit("update:modelValue", !props.modelValue);
}

async function resetCard() {
  if (props.isFlippable && isFlipped.value) {
    isFlipped.value = false;
  }
}

defineExpose({
  resetCard,
});
</script>

<template>
  <div class="h-96 w-full" style="perspective: 600px">
    <div
      class="card h-full w-full cursor-pointer shadow"
      :class="[{ flipCard: isFlippable && modelValue }]"
      @click="flip"
    >
      <div
        class="cardFace flex h-full w-full select-none items-center bg-gray-50 text-center"
      >
        <slot name="cardFront"></slot>
      </div>
      <div
        class="cardFace flipCardBack flex h-full w-full select-none items-center bg-gray-50"
      >
        <slot name="cardBack"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 800ms;
  transform-style: preserve-3d;
}

.cardFace {
  position: absolute;
  backface-visibility: hidden;
}

.flipCard {
  transform: rotateY(-180deg);
}

.flipCardBack {
  transform: rotateY(180deg);
}
</style>
