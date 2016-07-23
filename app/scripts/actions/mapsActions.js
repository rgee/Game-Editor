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

  removeSpawnPoint(key, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.RemovingSpawnPoint });
      const path = `maps/${mapId}/spawnPoints/${key}`;
      firebase.database().ref(path).remove().then(
        () => {
          dispatch({
            type: Actions.SpawnPointRemoved,
            key,
            mapId
          });
        },
        (err) => {
          console.error('Failed to remove spawn point');
        }
      )
    }
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
  },

  startCreatingNewTriggerTile(position) {
    return {
      type: Actions.StartCreatingNewTriggerTile,
      position
    };
  },

  cancelCreatingNewTriggerTile() {
    return {
      type: Actions.CancelCreatingNewTriggerTile
    };
  },

  updateEditingTriggerTile(trigger, triggerId, mapId) {
    return (dispatch, getState) => {
      const maps = getState().maps.values;
      const { triggerTiles } = maps[mapId];
      const existingTrigger = triggerTiles[triggerId];
      const updated = Object.assign({}, existingTrigger, trigger);
      dispatch({ type: Actions.UpdatingTriggerTile });

      const path = `maps/${mapId}/triggerTiles/${triggerId}`;
      firebase.database().ref(path).set(updated).then(
        () => {
          dispatch({
            type: Actions.TriggerTileUpdated,
            mapId,
            key: triggerId,
            triggerTile: updated
          });
        },

        (err) => {
          console.error('Failed to update trigger tile.', err);
        }
      )
    }
  },

  editTriggerTile(triggerId) {
    return {
      type: Actions.StartEditingTriggerTile,
      triggerId
    };
  },

  cancelEditingTriggerTile() {
    return {
      type: Actions.CancelEditingTriggerTile
    };
  },

  saveNewTriggerTile(trigger, mapId) {
    return (dispatch, getState) => {
      const state = getState();
      const fullTrigger = Object.assign({}, trigger, {
        position: state.maps.pendingTriggerTilePosition
      });

      dispatch({ type: Actions.SavingNewTriggerTile });
      const path = `maps/${mapId}/triggerTiles`;
      firebase.database().ref(path).push(fullTrigger).then(
        (newTrigger) => {
          dispatch({
            type: Actions.TriggerTileSaved,
            mapId,
            key: newTrigger.key,
            triggerTile: fullTrigger
          });
        },

        (err) => {
          console.error('Failed to save trigger tile.', err);
        }
      )
    }
  }
}
