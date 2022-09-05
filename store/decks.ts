import { defineStore } from "pinia";
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

    currentDeck: null,
  }),
  getters: {
    decks: (state) => {
      return state.allDecks.data;
    },
    pagination: (state) => {
      return state.allDecks.meta;
    },
    lastUsedDecksIds: () => {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    },
    lastUsedDecks: (state) => {
      const deckIds: string[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      return state.allDecks.data
        ? state.allDecks.data.filter((deck) => deckIds.includes(deck.id))
        : [];
    },
  },
  actions: {
    addUsedDeck(deckId: string | number) {
      // Retrieve existing from localstorage
      let used = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

      // Remove the deck id if it's already in the list to prevent duplicates
      used = used.filter((id: string | number) => id !== deckId);

      // Remove the oldest deck if we have reached the deck number limit
      if (used.length === MAX_LAST_USED_DECKS) {
        used.pop();
      }

      // add at first position
      used.unshift(deckId);

      // Update local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(used));
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
