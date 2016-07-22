import { Actions } from '../constants';
import firebase from '../firebase';
import uuid from 'uuid';
import { remove } from 'lodash';

export default {

  changeEditingMode(mode) {
    return (dispatch) => {
      dispatch({
        type: Actions.ChangeEditingMode,
        newMode: mode
      });
    };
  },

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
        createdOn,
        obstructions: {}
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

  removeObstruction(key, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.RemovingObstruction });
      const path = `maps/${mapId}/obstructions/${key}`;
      firebase.database().ref(path).remove().then(
        () => {
          dispatch({
            type: Actions.ObstructionRemoved,
            key,
            mapId
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
  },

  saveNewSpawnPoint(characterId, mapId) {
    return (dispatch, getState) => {
      const state = getState();

      const spawnPoint = {
        position: state.maps.pendingSpawnPosition,
        characterId
      };

      dispatch({ type: Actions.SavingNewSpawnPoint });
      const path = `maps/${mapId}/spawnPoints`;
      firebase.database().ref(path).push(spawnPoint).then(
        (newSpawnPoint) => {
          dispatch({
            type: Actions.SpawnPointSaved,
            mapId,
            key: newSpawnPoint.key,
            spawnPoint
          });
        },

        (err) => {
          console.error('Failed to save spawn point.', err);
        }
      )
    };
  },

  startCreatingNewSpawnPoint(position) {
    return {
      type: Actions.StartCreatingNewSpawnPoint,
      position
    };
  },

  cancelCreatingNewSpawnPoint() {
    return {
      type: Actions.CancelCreatingNewSpawnPoint
    };
  }
}
