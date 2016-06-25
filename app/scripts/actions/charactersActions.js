import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';
import { pick } from 'lodash';


export default {
  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingCharacters });
      firebase.database().ref('characters').once('value').then((snapshot) => {
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

      // TODO: Delete portrait from storage here.
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
        id: uuid.v4()
      });

      const portraitMeta = {
        contentType: character.portrait.file.type
      };
      const file = character.portrait.file;

      const portraitPath = `portraits/${character.id}`;
      character.portraitPath = portraitPath;

      const uploadTask = firebase.storage().ref().child(portraitPath).put(file, portraitMeta);
      uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.error(error);
        },

        () => {

          const characterKey = character.name.toLowerCase();
          character.portraitURL = uploadTask.snapshot.downloadURL;
          const sanitizedCharacter = pick(character, [
            'id',
            'name',
            'portraitPath',
            'portraitURL'
          ]);
          firebase.database().ref(`characters/${characterKey}`).set(sanitizedCharacter).then(
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
