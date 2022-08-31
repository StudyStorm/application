import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const LOCAL_STORAGE_KEY = "lastUsedDecks";
export const MAX_LAST_USED_DECKS = 3;

export const useDecksStore = defineStore("decks", {
  state: () => ({
    bestRatedDecks: [],

    allDecks: [],

    lastUsedDecksIds: useLocalStorage(LOCAL_STORAGE_KEY, [] as number[]),
  }),
  getters: {
    lastUsedDecks: (state) => {
      return state.allDecks.filter((deck) =>
        state.lastUsedDecksIds.includes(deck.id)
      );
    },
  },
  actions: {
    addUsedDeck(deckId: number) {
      // Remove the deck id if it's already in the list to prevent duplicates
      this.lastUsedDecksIds = this.lastUsedDecksIds.filter(
        (id: number) => id !== deckId
      );

      // Remove the oldest deck if we have reached the deck number limit
      if (this.lastUsedDecksIds.length === MAX_LAST_USED_DECKS) {
        this.lastUsedDecksIds.pop();
      }

      // add at first position
      this.lastUsedDecksIds.unshift(deckId);
    },

    async fetchDecks() {
      useFetchAPI("/dashboard", {
        method: "GET",
      });
    },
  },
});
