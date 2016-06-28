import { Actions } from '../constants';
import initialState from '../store/initialstate';

export default (currentState, action) => {
  switch (action.type) {
    case Actions.FetchingDialogues:
      return {
        state: 'loading',
        values: {}
      };
    case Actions.ReceiveDialogues:
      return {
        state: 'loaded',
        values: Object.assign({}, currentState.values, action.dialogues)
      };
    case Actions.SavingNewDialogue:
      return {
        state: 'saving',
        values: currentState.values
      };
    case Actions.NewDialogueSaved:
      return {
        state: 'loaded',
        values: Object.assign({}, currentState.values, {
          [action.dialogue.id]: action.dialogue
        })
      };
    default:
      return currentState || initialState.dialogues;
  }
};
