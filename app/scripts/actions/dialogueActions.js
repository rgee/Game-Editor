import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';

export default {
  create(dialogue) {
    dispatch({ type: Actions.SavingNewDialogue });
    const id = uuid.v4();
    dialogue = Object.assign({}, dialogue, { id });
    firebase.database().ref(`dialogues/${id}`).set(dialogue).then(
      () => {
        dispatch({
          type: Actions.NewDialogueSaved,
          dialogue
        });
      },
      (error) => {
        console.error('Failed to save new dialogue.', error);
      }
    );
  },

  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingDialogues });
      firebase.database().ref('dialogues').once('value').then((dialogues) => {
        dispatch({
          type: Actions.ReceiveDialogues,
          values: dialogues.val() || {}
        });
      });
    };
  }
};
