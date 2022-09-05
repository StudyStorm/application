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
  }),
  getters: {
    filteredDecks(state) {
      return state.allDecks.data
        ? state.allDecks.data.filter((deck) => {
            return deck.name
              .toLowerCase()
              .includes(state.searchFilter.toLowerCase());
          })
        : [];
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
    addUsedDeck(deckId: number | string) {
      // Remove the deck id if it's already in the list to prevent duplicates
      this.lastUsedDecksIds = this.lastUsedDecksIds.filter(
        (id: number | string) => id !== deckId
      );

      // Remove the oldest deck if we have reached the deck number limit
      if (this.lastUsedDecksIds.length === MAX_LAST_USED_DECKS) {
        this.lastUsedDecksIds.pop();
      }

      // add at first position
      this.lastUsedDecksIds.unshift(deckId);
    },

    async fetchDecks() {
      const data = await useAuth().request({
        method: "get",
        url: "http://localhost:3333/v1/decks",
      });
      // const { data, error } = await useFetchAPI<Pagination<Deck>>("/v1/decks", {
      //   method: "GET",
      // });

      this.allDecks = data;
    },

    async fetchBestDecks() {
      const data = await useAuth().request({
        method: "get",
        url: `http://localhost:3333/v1/decks?top=${MAX_BEST_DECKS}`,
      });

      this.bestRatedDecks = data.data;
    },
  },
});
