import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';

export default {
  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingMaps });
      firebase.database().ref('maps').orderByChild('createdOn').once('value').then((maps) => {
        dispatch({
          type: Actions.ReceiveMaps,
          maps: maps.val() || {}
        });
      });
    };
  },

  create(map) {
    return (dispatch) => {
      dispatch({ type: Actions.SavingNewMap });
      const id = uuid.v4();
      const createdOn = new Date().getTime();
      map = Object.assign({}, map, {
        id,
        createdOn
      });

      firebase.database().ref(`maps/${id}`).set(map).then(
        () => {
          dispatch({
            type: Actions.NewMapSaved,
            map
          });
        },

        (error) => {
          console.error('Failed to save new map', error);
        }
      )
    };
  },

  discardNewMap() {
    return {
      type: Actions.DiscardNewMap
    };
  },

  startNewMapCreation() {
    return {
      type: Actions.StartCreatingNewMap
    };
  }
}
