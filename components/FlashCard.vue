<script setup lang="ts">
   const card = ref()

    const props = defineProps({
      question: String,
      answer: String
    });


    async function sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function resetCard(){
      await card.value.resetCard();
    }

    defineExpose({
      resetCard
    });

</script>

<template>
  <Card ref="card" :isFlippable="true">
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
    background: #F2F2F2;
  }

  .cardText {
    color: #3F434A;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-left:auto;
    margin-right:auto;
  }
</style>