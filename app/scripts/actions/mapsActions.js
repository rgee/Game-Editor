import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';
import { remove } from 'lodash';

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
  },

  removeObstruction(position, map) {
    return (dispatch) => {
      dispatch({ type: Actions.RemovingObstruction });
      const path = `maps/${map.id}/obstructions`;
      firebase.database().ref(path).push(position).then(
        () => {
          dispatch({
            type: Actions.ObstructionRemoved,
            position
          });
        },

        (err) => {
          console.error('Failed to remove obstruction');
        }
      )
    };
  },

  addObstruction(position, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.AddingObstruction });
      const path = `maps/${mapId}/obstructions`;
      firebase.database().ref(path).push(position).then(
        (newPos) => {
          dispatch({
            type: Actions.ObstructionAdded,
            mapId,
            key: newPos.key,
            position
          });
        },

        (err) => {
          console.error('Failed to add obstruction');
        }
      )
    };
  }
}
