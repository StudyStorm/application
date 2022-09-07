import { defineStore } from "pinia";
import { Pagination } from "../types/app";
import Deck from "~~/models/Deck";
import { CardContent } from "~~/models/Card";

const LOCAL_STORAGE_KEY = "lastUsedDecks";
const MAX_BEST_DECKS = 3;
export const MAX_LAST_USED_DECKS = 3;

export const useDecksStore = defineStore("decks", {
  state: () => ({
    searchFilter: "",

    bestRatedDecks: [],

    allDecks: {} as Pagination<Deck>,

    filteredDecks: {} as Pagination<Deck>,

    currentDeck: null,

    currentUserVote: 0,
  }),
  getters: {
    decks: (state) => {
      return state.filteredDecks.data;
    },
    pagination: (state) => {
      return state.filteredDecks.meta;
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

    async fetchAllDecks() {
      const { data } = await useFetchAPI<Pagination<Deck>>(`/v1/decks`, {
        method: "GET",
      });

      this.allDecks = data;
    },

    async fetchDecks(page = 1) {
      const { data } = await useFetchAPI<Pagination<Deck>>(
        `/v1/decks?page=${page}&search=${this.searchFilter}`,
        {
          method: "GET",
        }
      );

      this.filteredDecks = data;
    },

    async fetchBestDecks() {
      const { data } = await useFetchAPI<Pagination<Deck>>(
        `/v1/decks?top=${MAX_BEST_DECKS}&limit=${MAX_BEST_DECKS}`,
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

    async createCard(payload: { deckId: string; content: CardContent }) {
      const { data, error } = await useFetchAPI("v1/decks/cards", {
        method: "POST",
        body: { ...payload },
      });
      return { data, error };
    },

    async updateCard(cardId: string, content: CardContent) {
      console.log(content);
      const { data, error } = await useFetch(`v1/decks/cards/${cardId}`, {
        method: "PATCH",
        body: { ...content },
        credentials: "include",
        baseURL: useRuntimeConfig().apiURL,
        initialCache: false,
      });
      return { data, error };
    },

    async fetchDeckUserRating(deckId: string) {
      const { data } = await useFetchAPI<{
        user_vote: { vote: number };
      }>(`/v1/decks/${deckId}/rate`, {
        method: "GET",
      });

      this.currentUserVote = data.user_vote ? data.user_vote.vote : 0;
    },

    async upvoteDeck(deck: Deck) {
      this.currentUserVote === 0
        ? await this.vote(deck, 1)
        : this.resetvoteDeck(deck);
    },

    async downvoteDeck(deck: Deck) {
      this.currentUserVote === 0
        ? await this.vote(deck, -1)
        : this.resetvoteDeck(deck);
    },

    async resetvoteDeck(deck: Deck) {
      await useFetchAPI(`/v1/decks/${deck.id}/rate`, {
        method: "DELETE",
      });
      this.refreshRatings(deck);
    },

    async refreshRatings(deck: Deck) {
      const { data } = await useFetchAPI<{
        vote: number;
        user_vote: { vote: number };
      }>(`/v1/decks/${deck.id}/rate`, {
        method: "GET",
      });
      deck.votes = data.vote;
      this.currentUserVote = data.user_vote ? data.user_vote.vote : 0;
    },

    async vote(deck: Deck, vote: number) {
      await useFetchAPI(`/v1/decks/${deck.id}/rate`, {
        method: "POST",
        body: {
          vote: vote,
        },
      });
      await this.refreshRatings(deck);
    },
  },
});
