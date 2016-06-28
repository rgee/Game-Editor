import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';

export default {
  startNewDialogueCreation() {
    return { type: Actions.StartCreatingNewDialogue };
  },

  discardNewDialogue() {
    return { type: Actions.DiscardNewDialogue };
  },

  create(dialogue) {
    return (dispatch) => {
      dispatch({ type: Actions.SavingNewDialogue });
      const id = uuid.v4();
      const createdOn = new Date().getTime();
      dialogue = Object.assign({}, dialogue, {
        id,
        createdOn
      });
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
    };
  },

  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingDialogues });
      firebase.database().ref('dialogues')
        .orderByChild('createdOn').once('value').then((dialogues) => {
        dispatch({
          type: Actions.ReceiveDialogues,
          dialogues: dialogues.val() || {}
        });
      });
    };
  }
};
