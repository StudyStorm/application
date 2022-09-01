<script setup lang="ts">
  import { FlagIcon } from "@heroicons/vue/24/outline/index.js";

   const isFlipped = ref(false)
   const card = ref()
   const flippedCard = ref()

    const props = defineProps({
      question: String,
      response: String
    });

    async function sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function resetCard(){
      if (isFlipped.value){
        flippedCard.value.style.transform = 'rotateY(180deg)';
        isFlipped.value = false;
        await sleep(300);
      }
    }

    defineExpose({
      resetCard
    });

</script>

<template>
  <div class="container">
      <div
        ref="card"
        class="card"
        @click="isFlipped = !isFlipped"
        v-bind:class="{ flipCard: isFlipped }"
      >
        <div class="cardFace flex items-center">
          <span class="cardText">
            {{ question }}
          </span>
        </div>
        <div class="cardFace flipCardBack flex items-center" ref="flippedCard">
          <span class="cardText">
            {{ response }}
          </span>
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
  
  .flipCard {
    transform: rotateY(-180deg);
  }
  
  .flipCardBack {
    transform: rotateY(180deg);
  }
</style>