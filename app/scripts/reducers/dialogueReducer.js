import { Actions } from '../constants';

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
        values: Object.assign({}, currentState.values, actions.dialogues)
      }
  }
};
