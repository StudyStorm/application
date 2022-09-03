<script setup lang="ts">
const props = defineProps({
  isFlippable: Boolean,
});

const isFlipped = ref(false);
const card = ref();
const flippedCard = ref();

async function sleep(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

function flip() {
  isFlipped.value = !isFlipped.value;
}

async function resetCard() {
  if (props.isFlippable && isFlipped.value) {
    flippedCard.value.style.transform = "rotateY(180deg)";
    isFlipped.value = false;
    await sleep(800);
  }
}

defineExpose({
  resetCard,
});
</script>

<template>
  <div class="container">
    <div
      ref="card"
      class="card"
      :class="[{ flipCard: isFlippable && isFlipped }]"
      @click="flip"
    >
      <div class="cardFace flex select-none items-center">
        <slot name="cardFront"></slot>
      </div>
      <div
        ref="flippedCard"
        class="cardFace flipCardBack flex select-none items-center"
      >
        <slot name="cardBack"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
  perspective: 600px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 800ms;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.cardFace {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #f2f2f2;
}

.flipCard {
  transform: rotateY(-180deg);
}

.flipCardBack {
  transform: rotateY(180deg);
}
</style>
