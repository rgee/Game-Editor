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
    case Actions.ConfirmNewCharacter:
      // TODO: this should be a loading state while the character
      // is saving.
      return {
        state: 'loaded',
        values: currentState.values
      };
    case Actions.DiscardNewCharacter:
      return {
        state: 'loaded',
        values: currentState.values
      };
    case Actions.SavingNewCharacter:
      return {
        state: 'saving',
        values: currentState.values
      };
    case Actions.NewCharacterSaved:
      return {
        state: 'loaded',
        values: currentState.values.concat([action.character])
      };
    default:
      return currentState || initialState.characters;
  }
};
