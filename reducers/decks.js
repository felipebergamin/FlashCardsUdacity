import { ADD_DECK, LOAD_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    case LOAD_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    default:
      return state;
  }
}
