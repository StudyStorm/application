import { setActivePinia, createPinia } from "pinia";
import { MAX_LAST_USED_DECKS, useDecksStore } from "~/store/decks";

describe("Decks store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Should retrieve the initial empty last used decks from the local storage", () => {
    const store = useDecksStore();
    expect(store.lastUsedDecksIds).toEqual([]);
  });

  it("Should add a deck id to last used decks", () => {
    const store = useDecksStore();
    store.addUsedDeck(1);
    expect(store.lastUsedDecksIds).toEqual([1]);
  });

  it("Should add N deck id to last used decks", () => {
    const store = useDecksStore();
    for (let i = 1; i <= MAX_LAST_USED_DECKS; i++) {
      store.addUsedDeck(i);
    }

    expect(store.lastUsedDecksIds).toEqual(
      Array.from(Array(MAX_LAST_USED_DECKS), (_, i) => i + 1).sort(
        (a, b) => b - a
      )
    );
  });

  it("Should not add more decks than the limited", () => {
    const store = useDecksStore();
    for (let i = 1; i <= MAX_LAST_USED_DECKS + 2; i++) {
      store.addUsedDeck(i);
    }
    expect(store.lastUsedDecksIds.length).toEqual(MAX_LAST_USED_DECKS);
  });

  it("Sould remove the oldest deck if the limit is reached 1", () => {
    const store = useDecksStore();
    for (let i = 1; i <= MAX_LAST_USED_DECKS + 1; i++) {
      store.addUsedDeck(i);
    }

    expect(store.lastUsedDecksIds).toEqual(
      Array.from(Array(MAX_LAST_USED_DECKS), (_, i) => i + 2).sort(
        (a, b) => b - a
      )
    );
  });

  it("Sould remove the oldest deck if the limit is reached 2", () => {
    const store = useDecksStore();
    for (let i = 1; i <= MAX_LAST_USED_DECKS + 3; i++) {
      store.addUsedDeck(i);
    }

    expect(store.lastUsedDecksIds).toEqual(
      Array.from(Array(MAX_LAST_USED_DECKS), (_, i) => i + 4).sort(
        (a, b) => b - a
      )
    );
  });
});
