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
      }
    default:
      return currentState || initialState.dialogues;
  }
};
