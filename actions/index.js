export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_DECKS = 'LOAD_DECKS';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function loadDecks(decks) {
  return {
    type: LOAD_DECKS,
    decks,
  };
}
