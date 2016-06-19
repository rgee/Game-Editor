import { Actions } from '../constants';
import firebase from '../firebase';


export default {
  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingCharacters });
      firebase.database().ref('characters').on('value', (snapshot) => {
        dispatch({
          type: Actions.ReceiveCharacters,
          values: snapshot.val() || {}
        });
      });
    };
  }
}
