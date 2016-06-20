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
  },

  startNewCharacterCreation() {
    return (dispatch) => {
      dispatch({ type: Actions.StartCreatingNewCharacter });
    };
  },

  confirmNewCharacter(character) {
    return (dispatch) =>{
      dispatch({ type: Actions.SavingNewCharacter });
      var characterKey = character.name.toLowerCase();
      firebase.database().ref(`characters/${characterKey}`).set(character).then(
        () => {
          dispatch({
            type: Actions.NewCharacterSaved,
            character
          });
        },
        (err) => {
          console.error('Failed to save character: ' + err);
        }
      )
    };
  },

  discardNewCharacter() {
    return (dispatch) =>{
      dispatch({ type: Actions.DiscardNewCharacter });
    };
  }
}
