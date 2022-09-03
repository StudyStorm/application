import { defineStore } from "pinia";
import Card from "~~/models/Card";
import User from "~~/models/User";
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
    async fetchDeck(deckId: number) {
      console.log(deckId);
      // TODO: fetch the real deck from API

      // TMP CODE
      const creator = new User();
      creator.firstName = "John";
      creator.lastName = "Doe";

      const deck = {
        id: "01013eab-bbcc-4037-ae99-a08efb2a921b",
        name: "Random deck",
        creator: creator,
        cards: [
          {
            id: "a8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question: "What is the capital of switzerland?",
              answers: [{ label: "Bern", isTheAnswer: true }],
              type: "flashCard",
            },
          },
          {
            id: "b8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question: "Where am I ?",
              answers: [
                { label: "I am here", isTheAnswer: true },
                { label: "I am not here", isTheAnswer: false },
                { label: "I am maybe here", isTheAnswer: false },
                { label: "Working", isTheAnswer: true },
              ],
              type: "options",
            },
          },
          {
            id: "c8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question:
                "Quelle(s) déclaration(s) C correspond(ent) à l'énoncé suivant ? t est un tableau de 10 pointeurs pointant chacun sur un int constant",
              answers: [
                { label: "const int* t[10]", isTheAnswer: true },
                { label: "int* const t[10]", isTheAnswer: false },
                { label: "const int* t[10]", isTheAnswer: false },
                { label: "int** const t[10]", isTheAnswer: false },
              ],
              type: "options",
            },
          },
          {
            id: "d8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question: "What is the capital of Germany?",
              answers: [{ label: "Berlin", isTheAnswer: true }],
              type: "flashCard",
            },
          },
          {
            id: "e8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question: "What is the capital of France?",
              answers: [{ label: "Paris", isTheAnswer: true }],
              type: "flashCard",
            },
          },
          {
            id: "f8a7c042-d537-45c4-b3da-ac1c20c0bae7",
            content: {
              question: "What is the capital of the United Stated of America?",
              answers: [{ label: "Washington DC", isTheAnswer: true }],
              type: "flashCard",
            },
          },
        ],
      };
      // END OF TMP CODE

      this.deck = deck;
    },

    async reportCard(report: { card: Card; message: string }) {
      console.log("report card", report.card, report.message);
      // TODO: call API: /v1/decks/cards/report/{cardId}
    },
  },
});
