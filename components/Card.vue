<script setup lang="ts">
const props = defineProps({
  isFlippable: Boolean,
});

const isFlipped = ref(false);
const flippedCard = ref();

// async function sleep(ms: number) {
//   return await new Promise((resolve) => setTimeout(resolve, ms));
// }

function flip() {
  isFlipped.value = !isFlipped.value;
}

async function resetCard() {
  if (props.isFlippable && isFlipped.value) {
    // flippedCard.value.style.transform = "rotateY(180deg)";
    isFlipped.value = false;
    // await sleep(800);
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
      :class="[{ flipCard: isFlippable && isFlipped }]"
      @click="flip"
    >
      <div
        class="cardFace flex h-full w-full select-none items-center bg-gray-50"
      >
        <slot name="cardFront"></slot>
      </div>
      <div
        ref="flippedCard"
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
