import { Actions } from '../constants';
import firebase from '../firebase';

export default {
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
