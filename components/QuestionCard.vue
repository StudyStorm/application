<script setup lang="ts">
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid/index.js";
import Card from "~~/models/Card";
import ConfirmModal from "~/components/ConfirmModal.vue";
import { useDecksStore } from "~/store/decks";

const props = defineProps<{
  card: Card;
  number: number;
  canDelete: boolean;
  canEdit: boolean;
}>();
const decksStore = useDecksStore();

async function deleteCard() {
  await decksStore.deleteCard(props.card.id);
  await decksStore.refreshDeck();
}
</script>

<template>
  <s-card-squared :key="card.id">
    <div class="invisible absolute -top-2 -right-2 group-hover:visible">
      <create-card-modal v-if="canEdit" v-slot="{ open }" :card="card">
        <div
          class="mx-1 inline-flex h-8 w-8 items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-storm-blue p-1 text-xs font-bold text-white hover:scale-110"
          @click="open"
        >
          <PencilIcon />
        </div>
      </create-card-modal>
      <confirm-modal v-if="canDelete" @confirm="deleteCard">
        <template #title>
          {{ $t("app.cards.modal.delete.title") }}
        </template>
        <template #content>
          {{ $t("app.cards.modal.delete.content") }}
        </template>
        <template #default="{ open }">
          <div
            class="inline-flex h-8 w-8 items-center justify-center overflow-hidden text-ellipsis rounded-full border-2 border-white bg-red-800 p-1 text-xs font-bold text-white hover:scale-110"
            @click="open"
          >
            <TrashIcon />
          </div>
        </template>
      </confirm-modal>
    </div>
    <p class="flex min-h-0 flex-1 items-center overflow-y-auto">
      {{ card.content.question }}
    </p>
    <div class="text-xs">
      {{ number }}
    </div>
  </s-card-squared>
</template>
