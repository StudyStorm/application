<script setup lang="ts">
const props = defineProps<{
  isFlippable: boolean;
  modelValue?: boolean;
}>();

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
  <div style="perspective: 600px; aspect-ratio: 1/1" @click="flip">
    <div
      class="card h-full w-full"
      :class="{ isFlippable, flipCard: isFlippable && modelValue }"
    >
      <div class="cardFace h-full w-full select-none bg-gray-50">
        <slot />
      </div>
      <div class="cardFace flipCardBack h-full w-full select-none bg-gray-50">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.isFlippable {
  cursor: pointer;
}

.card {
  transition: transform 600ms;
  transform-style: preserve-3d;
}

.cardFace {
  position: absolute;
  backface-visibility: hidden;
  @apply min-h-0 overflow-y-auto rounded-lg shadow;
}

.flipCard {
  transform: rotateY(-180deg);
}

.flipCardBack {
  transform: rotateY(180deg);
}
</style>
