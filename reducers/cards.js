import { ADD_CARD, LOAD_CARDS } from '../actions';

export default function cards (state = {}, action) {
  switch(action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.card.id]: action.card,
      };
    case LOAD_CARDS:
      return {
        ...state,
        ...action.cards,
      };
    default:
      return state;
  }
}
