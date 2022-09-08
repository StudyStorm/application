import { defineStore } from "pinia";
import Card from "~~/models/Card";

export const useLearnStore = defineStore("learn", {
  state: () => ({
    deck: null,
    currentCardIndex: 0,
  }),

  getters: {
    currentCard(state): Card {
      return state.deck.cards[state.currentCardIndex];
    },
    currentStep(state): number {
      return state.currentCardIndex + 1;
    },
    numberOfCards(state): number {
      return state.deck.cards.length;
    },
    canGoBack(state): boolean {
      return state.currentCardIndex > 0;
    },
    canGoForward(state): boolean {
      return state.currentCardIndex < state.deck.cards.length - 1;
    },
  },
  actions: {
    previousCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
      }
    },
    nextCard() {
      if (this.currentCardIndex < this.deck.cards.length - 1) {
        this.currentCardIndex++;
      }
    },
    async fetchDeck(deckId: string) {
      const { data: deck } = await useFetchAPI(`/v1/decks/${deckId}`, {
        method: "GET",
      });

      this.deck = deck;
      this.currentCardIndex = 0;
    },

    async reportCard(cardId: string, message: string) {
      await useFetchAPI(`/v1/decks/cards/${cardId}/report`, {
        method: "POST",
        body: {
          message: message,
        },
      });
    },
  },
});
