import { Actions } from '../constants';
import firebase from 'firebase-client';
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

  editMapAttributes(id) {
    return {
      type: Actions.StartEditingMapAttributes,
      mapId: id
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

  deleteMap(map) {
    return (dispatch) => {
      dispatch({ type: Actions.DeletingMap });
      const ref = firebase.database().ref(`maps/${map.id}`);
      ref.remove().then(
        () => dispatch({ type: Actions.MapDeleted, map }),
        (error) => console.error(`Failed to delete map: ${error}`)
      );
    };
  },

  save(map) {
    return (dispatch) => {
      dispatch({ type: Actions.SavingMap });
      const createdOn = map.createdOn || new Date().getTime();
      map = Object.assign({}, map, {
        createdOn,
        obstructions: {},
        spawnPoints: {},
        turnEvents: {}
      });

      // Store the image under the map_backgrounds path indexed
      // by the ID of the map.
      const storagePath = `map_backgrounds/${map.id}`;
      map.backgroundPath = storagePath;


      const saveMap = () => {
        firebase.database().ref(`maps/${map.id}`).set(map).then(
          () => {
            dispatch({
              type: Actions.MapSaved,
              map
            });
          },

          (error) => {
            console.error('Failed to save new map', error);
          }
        );
      };

      const backgroundFile = map.background.file;
      if (backgroundFile) {
        // Set up the actual file object and metadata for Firebase
        const meta = {
          contentType: backgroundFile.type
        };

        // Upload the file then once that's complete, save the map
        // with the resulting file's URL attached.
        const pathRef = firebase.storage().ref().child(storagePath);
        const uploadTask = pathRef.put(backgroundFile, meta);
        uploadTask.on('state_changed',
          (snapshot) => {},
          console.error,
          () => {
            map.backgroundURL = uploadTask.snapshot.downloadURL;
            delete map.background;
            saveMap();
          }
        );
      } else {
        saveMap();
      }
    };
  },

  discardMap() {
    return {
      type: Actions.DiscardMap
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

  startCreatingNewTurnEvent() {
    return {
      type: Actions.StartCreatingNewTurnEvent
    };
  },

  cancelCreatingNewTurnEvent() {
    return {
      type: Actions.CancelCreatingNewTurnEvent
    };
  },

  cancelEditingTurnEvent() {
    return {
      type: Actions.CancelEditingTurnEvent
    };
  },

  editTurnEvent(turnEventId) {
    return {
      type: Actions.StartEditingTurnEvent,
      turnEventId
    };
  },

  saveNewTurnEvent(turnEvent, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.SavingNewTurnEvent });

      const path = `maps/${mapId}/turnEvents`;
      firebase.database().ref(path).push(turnEvent).then(
        (savedEvent) => {
          dispatch({
            type: Actions.TurnEventSaved,
            mapId,
            key: savedEvent.key,
            turnEvent
          });
        },

        (err) => {
          console.error('Failed to save turn event.', err);
        }
      )
    };
  },

  deleteTurnEvent(turnEventId, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.DeletingTurnEvent });
      const path = `maps/${mapId}/turnEvents/${turnEventId}`;
      firebase.database().ref(path).remove().then(
        () => {
          dispatch({
            type: Actions.TurnEventDeleted,
            turnEventId,
            mapId
          });
        }
      );
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
    };
  },

  updateEditingTurnEvent(turnEvent, turnEventId, mapId) {
    return (dispatch, getState) => {
      const maps = getState().maps.values;
      const { turnEvents } = maps[mapId];
      const existingTurnEvent = turnEvents[turnEventId];
      const updated = Object.assign({}, existingTurnEvent, turnEvent);
      dispatch({ type: Actions.UpdatingTurnEvent });

      const path = `maps/${mapId}/turnEvents/${turnEventId}`;
      firebase.database().ref(path).set(updated).then(
        () => {
          dispatch({
            type: Actions.TurnEventUpdated,
            mapId,
            key: turnEventId,
            turnEvent: updated
          });
        },

        (err) => {
          console.error('Failed to update turn event.', err);
        }
      )
    };
  },

  deleteTrigger(triggerId, mapId) {
    return (dispatch) => {
      dispatch({ type: Actions.DeletingTriggerTile });
      const path =`maps/${mapId}/triggerTiles/${triggerId}`;
      firebase.database().ref(path).remove().then(
        () => {
          dispatch({
            type: Actions.TriggerTileDeleted,
            triggerId,
            mapId
          });
        }
      )
    };
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
