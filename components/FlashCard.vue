<script setup lang="ts">
  import { FlagIcon } from "@heroicons/vue/24/outline/index.js";

   const isFlipped = ref(false)

   const card = {
      question: "Where am i?",
      response: "I am here"
   };

</script>

<template>
  <div class="container">
      <div
        class="card"
        @click="isFlipped = !isFlipped"
        v-bind:class="{ flipCard: isFlipped }"
      >
        <div class="cardFace">
          {{ card.question }}
        </div>
        <div class="cardFace flipCardBack">
          {{ card.response }}
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
    line-height: 400px;
    color: #3F434A;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    backface-visibility: hidden;
    background: #F2F2F2;
  }
  
  .flipCard {
    transform: rotateY(-180deg);
  }
  
  .flipCardBack {
    transform: rotateY(180deg);
  }
</style>