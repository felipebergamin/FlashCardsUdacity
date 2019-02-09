import * as API from '../utils/api';

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_DECKS = 'LOAD_DECKS';
export const LOAD_CARDS = 'LOAD_CARDS';

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

export function loadCards(cards) {
  return {
    type: LOAD_CARDS,
    cards,
  };
}

export function handleAddDeck(deck) {
  return async dispatch => {
    const added = await API.addDeck(deck);
    added && dispatch(addDeck(added));
  }
}

export function handleAddCard(card) {
  return async dispatch => {
    const added = await API.addCard(card);
    added && dispatch(addCard(added));
  }
}

export function loadInitialData() {
  return async dispatch => {
    const decks = await API.getAllDecks();
    const cards = await API.getAllCards();
    dispatch(loadDecks(decks));
    dispatch(loadCards(cards));
  }
}
