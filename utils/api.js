import { AsyncStorage } from 'react-native';

const storageKeys = {
  DECKS: 'Flushcards:decks',
  CARDS: 'Flushcards:cards',
};

export async function addDeck(deck) {
  try {
    let decks = JSON.parse(await AsyncStorage.getItem(storageKeys.DECKS));
    decks = {
      ...decks,
      [deck.id]: deck,
    };

    await AsyncStorage.setItem(storageKeys.DECKS, JSON.stringify(decks));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getAllDecks() {
  return JSON.parse(await AsyncStorage.getItem(storageKeys.DECKS));
}

export async function getDeckById(id) {
  const decks = JSON.parse(await AsyncStorage.getItem(storageKeys.DECKS));
  return decks[id];
}

export async function addCard(card) {
  try {
    let cards = JSON.parse(await AsyncStorage.getItem(storageKeys.CARDS));
    cards = {
      ...cards,
      [card.id]: card,
    };

    await AsyncStorage.setItem(storageKeys.CARDS, JSON.stringify(cards));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
