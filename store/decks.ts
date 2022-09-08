import { defineStore } from "pinia";
import { Pagination } from "~/types/app";
import Deck from "~~/models/Deck";
import { CardContent } from "~~/models/Card";
import { useFetchAPI } from "~/composables/useFetchAPI";

const LOCAL_STORAGE_KEY = "lastUsedDecks";
const MAX_BEST_DECKS = 3;
export const MAX_LAST_USED_DECKS = 3;

export const useDecksStore = defineStore("decks", {
  state: () => ({
    searchFilter: "",

    bestRatedDecks: [],

    filteredDecks: {} as Pagination<Deck>,

    currentDeck: null,

    currentUserVote: 0,

    lastVisitedDecks: [],
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

    async fetchLastVisited() {
      const decksIds: string[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      if (!decksIds) return [];

      this.lastVisitedDecks = (
        await Promise.all(
          decksIds.map(
            async (id) => (await useFetchAPI<Deck>(`v1/decks/${id}`)).data
          )
        )
      ).filter((c) => c !== null);
    },

    async fetchDeck(deckId: string) {
      const { data } = await useFetchAPI<Deck>(`/v1/decks/${deckId}`, {
        method: "GET",
      });
      this.currentDeck = data;
    },

    async refreshDeck() {
      if (!this.currentDeck) return;
      return this.fetchDeck(this.currentDeck.id);
    },

    async updateCard(cardId: string, payload: CardContent) {
      return useFetchAPI(`v1/decks/cards/${cardId}`, {
        method: "PATCH",
        useFetch: true,
        body: payload,
      });
    },

    async deleteCard(cardId: string) {
      return useFetchAPI(`v1/decks/cards/${cardId}`, {
        method: "DELETE",
      });
    },

    async createCard(payload: { deckId: string; content: CardContent }) {
      return useFetchAPI("v1/decks/cards", {
        method: "POST",
        body: payload,
      });
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

    async updateDeckName(deckId: string, deckName: string) {
      await useFetchAPI(`/v1/decks/${deckId}`, {
        method: "PATCH",
        body: {
          name: deckName,
        },
        useFetch: true,
      });
      this.fetchDeck(deckId);
    },

    async deleteDeck(deckId: string) {
      await useFetchAPI(`/v1/decks/${deckId}`, {
        method: "DELETE",
      });
    },
  },
});
