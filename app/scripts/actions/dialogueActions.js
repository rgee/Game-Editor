import { Actions } from '../constants';
import firebase from 'firebase-client';
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

  loadDialogue(id) {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingDialogue });
      firebase.database().ref(`dialogues/${id}`).once('value').then((snap) => {
        dispatch({
          type: Actions.ReceiveDialogue,
          dialogue: snap.val()
        });
      });
    }
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
