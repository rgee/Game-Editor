import { Actions } from '../constants';
import initialState from '../store/initialstate';

export default (currentState, action) => {
  switch (action.type) {
    case Actions.FetchingCharacters:
      return {
        state: 'loading',
        values: null
      };
    case Actions.ReceiveCharacters:
      return {
        state: 'loaded',
        values: action.values
      };
    case Actions.StartCreatingNewCharacter:
      return {
        state: 'creating_new_character',
        values: currentState.values
      };
    default:
      return currentState || initialState.characters;
  }
};
