import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { Pagination } from "../types/app";
import Deck from "~~/models/Deck";

const LOCAL_STORAGE_KEY = "lastUsedDecks";
const MAX_BEST_DECKS = 3;
export const MAX_LAST_USED_DECKS = 3;

export const useDecksStore = defineStore("decks", {
  state: () => ({
    searchFilter: "",

    bestRatedDecks: [],

    allDecks: {} as Pagination<Deck>,

    lastUsedDecksIds: useLocalStorage(LOCAL_STORAGE_KEY, [] as string[]),

    currentDeck: null,
  }),
  getters: {
    decks: (state) => {
      return state.allDecks.data;
    },
    pagination: (state) => {
      return state.allDecks.meta;
    },
    lastUsedDecks: (state) => {
      return state.allDecks.data
        ? state.allDecks.data.filter((deck) =>
            state.lastUsedDecksIds.includes(deck.id)
          )
        : [];
    },
  },
  actions: {
    addUsedDeck(deckId: string) {
      // Remove the deck id if it's already in the list to prevent duplicates
      this.lastUsedDecksIds = this.lastUsedDecksIds.filter(
        (id: string) => id !== deckId
      );

      // Remove the oldest deck if we have reached the deck number limit
      if (this.lastUsedDecksIds.length === MAX_LAST_USED_DECKS) {
        this.lastUsedDecksIds.pop();
      }

      // add at first position
      this.lastUsedDecksIds.unshift(deckId);
    },

    async fetchDecks(page = 1) {
      const { data } = await useFetchAPI<Pagination<Deck>>(
        `/v1/decks?page=${page}&search=${this.searchFilter}`,
        {
          method: "GET",
        }
      );

      this.allDecks = data;
    },

    async fetchBestDecks() {
      const { data } = await useFetchAPI<Pagination<Deck>>(
        `/v1/decks?top=${MAX_BEST_DECKS}`,
        {
          method: "GET",
        }
      );

      this.bestRatedDecks = data.data;
    },

    async fetchDeck(deckId: string) {
      const { data } = await useFetchAPI<Deck>(`/v1/decks/${deckId}`, {
        method: "GET",
      });

      this.currentDeck = data;
    },
  },
});
