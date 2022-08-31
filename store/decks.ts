import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const LOCAL_STORAGE_KEY = "lastUsedDecks";
export const MAX_LAST_USED_DECKS = 3;

export const useDecksStore = defineStore("decks", {
  state: () => ({
    MAX_LAST_USED_DECKS: 3,

    bestRatedDecks: [],

    allDecks: [],

    lastUsedDecksIds: useLocalStorage(LOCAL_STORAGE_KEY, [] as number[]),
  }),
  getters: {
    // lastUsedDecks: (state) => {
    //   // TODO: retrieve the last used decks from the local storage
    //   return state.allDecks.slice(0, 2);
    // },
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
