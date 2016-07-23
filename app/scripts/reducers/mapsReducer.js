import { Actions } from '../constants';
import initialState from '../store/initialstate';
import { omit } from 'lodash'

export default (currentState, action) => {
  switch (action.type) {
    case Actions.FetchingMaps:
      return {
        state: 'loading',
        editingMode: currentState.editingMode,
        values: {}
      };
    case Actions.ReceiveMaps:
      return {
        state: 'loaded',
        editingMode: currentState.editingMode,
        values: Object.assign({}, currentState.values, action.maps)
      };
    case Actions.StartCreatingNewMap:
      return {
        state: 'creating_new',
        editingMode: currentState.editingMode,
        values: currentState.values
      };
    case Actions.DiscardNewMap:
      return {
        state: 'loaded',
        editingMode: currentState.editingMode,
        values: currentState.values
      };
    case Actions.ChangeEditingMode:
      return {
        state: currentState.state,
        editingMode: action.newMode,
        values: currentState.values
      };
    case Actions.SavingNewMap:
      return {
        state: 'saving',
        editingMode: currentState.editingMode,
        values: currentState.values
      };
    case Actions.NewMapSaved:
      return {
        state: 'loaded',
        editingMode: currentState.editingMode,
        values: Object.assign({}, currentState.values, {
          [action.map.id]: action.map
        })
      };
    case Actions.ObstructionAdded: {
      const currentMap = currentState.values[action.mapId];
      currentMap.obstructions[action.key] = action.position;

      return {
        state: currentState.state,
        editingMode: currentState.editingMode,
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      };
    }
    case Actions.ObstructionRemoved: {
      const currentMap = currentState.values[action.mapId];
      delete currentMap.obstructions[action.key];

      return {
        state: currentState.state,
        editingMode: currentState.editingMode,
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      };
    }
    case Actions.StartCreatingNewSpawnPoint:
      return Object.assign({}, currentState, {
        pendingSpawnPosition: action.position
      });
    case Actions.CancelCreatingNewSpawnPoint:
      return omit(currentState, 'pendingSpawnPosition');
    case Actions.SavingNewSpawnPoint:
      return Object.assign({}, currentState, {
        state: 'saving',
      });
    case Actions.RemovingSpawnPoint:
      return Object.assign({}, currentState, {
        state: 'saving'
      });
    case Actions.SpawnPointSaved: {
      const withoutPending = omit(currentState, 'pendingSpawnPosition');
      const currentMap = currentState.values[action.mapId];
      const spawnPoints = currentMap.spawnPoints || {};
      spawnPoints[action.key] = action.spawnPoint;

      return Object.assign({}, withoutPending, {
        state: 'loaded',
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      });
    }
    case Actions.SpawnPointRemoved: {
      const currentMap = currentState.values[action.mapId];
      delete currentMap.spawnPoints[action.key];

      return {
        state: currentState.state,
        editingMode: currentState.editingMode,
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      };
    }
    default:
      return currentState || initialState.maps
  }
};
