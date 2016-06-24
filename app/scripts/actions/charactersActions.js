import { Actions } from '../constants';
import firebase from '../firebase';
import { uniqueId } from 'lodash';


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

  deleteCharacter(character) {
    return (dispatch) => {
      dispatch({ type: Actions.DeletingCharacter });
      var characterKey = character.name.toLowerCase();
      firebase.database().ref(`characters/${characterKey}`).remove().then(
        () => {
          dispatch({
            type: Actions.CharacterDeleted,
            character
          });
        },

        (err) => {
          console.error('Failed to delete character: ' + err);
        }
      );
    };
  },

  confirmNewCharacter(character) {
    return (dispatch) => {
      dispatch({ type: Actions.SavingNewCharacter });
      character = Object.assign({}, character, {
        id: uniqueId()
      });

      const portraitMeta = {
        contentType: character.portrait.file.type
      };
      const file = character.portrait.file;

      const uploadTask = firebase.storage().ref().child('portraits/' + character.id).put(file, portraitMeta);
      uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.error(error);
        },

        () => {

          const characterKey = character.name.toLowerCase();
          character.portraitURL = uploadTask.snapshot.downloadURL;
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
        }
      );
    };
  },

  discardNewCharacter() {
    return (dispatch) =>{
      dispatch({ type: Actions.DiscardNewCharacter });
    };
  }
}
