<script setup lang="ts">
const card = ref();

const props = defineProps({
  question: String,
  answer: String,
});

async function sleep(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

async function resetCard() {
  await card.value.resetCard();
}

defineExpose({
  resetCard,
});
</script>

<template>
  <Card ref="card" :is-flippable="true">
    <template #cardFront>
      <span class="cardText">
        {{ question }}
      </span>
    </template>
    <template #cardBack>
      <span class="cardText">
        {{ answer }}
      </span>
    </template>
  </Card>
</template>

<style scoped>
.cardFace {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #f2f2f2;
}

.cardText {
  color: #3f434a;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-left: auto;
  margin-right: auto;
}
</style>
