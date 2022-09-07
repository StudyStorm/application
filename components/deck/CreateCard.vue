<script setup lang="ts">
import { CardContent } from "~~/models/Card";

const cardModal = ref(null);

const virginCardContent = ref<CardContent>({
  question: null,
  answers: [],
  type: "string",
});

function initChild() {
  cardModal.value.init();
}
</script>

<template>
  <slot :open="initChild" />
  <DeckCardModal
    ref="cardModal"
    :card-id="null"
    :card-content="virginCardContent"
    :creating-mode="true"
  />
</template>
