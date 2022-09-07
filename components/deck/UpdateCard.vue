<script setup lang="ts">
import { CardContent } from "~~/models/Card";

const cardModal = ref(null);

defineProps<{
  cardId: string;
  cardContent: CardContent;
}>();

function initChild() {
  cardModal.value.init();
}
</script>

<template>
  <slot :open="initChild" />
  <DeckCardModal
    ref="cardModal"
    :card-id="cardId"
    :card-content="cardContent"
    :creating-mode="false"
  />
</template>
