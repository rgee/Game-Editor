import { Actions } from '../constants';
import initialState from '../store/initialstate';
import { omit, remove } from 'lodash'

const addTriggerTile = (currentState, action) => {
  const currentMap = currentState.values[action.mapId];
  currentMap.triggerTiles = Object.assign({}, currentMap.triggerTiles, {
    [action.key]: action.triggerTile
  });

  return Object.assign({}, currentState, {
    state: 'loaded',
    values: Object.assign({}, currentState.values, {
      [action.mapId]: currentMap
    })
  });
};

const addTurnEvent = (currentState, action) => {
  const currentMap = currentState.values[action.mapId];
  currentMap.turnEvents = Object.assign({}, currentMap.turnEvents, {
    [action.key]: action.turnEvent
  });

  return Object.assign({}, currentState, {
    state: 'loaded',
    values: Object.assign({}, currentState.values, {
      [action.mapId]: currentMap
    })
  });
}

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
    case Actions.DeletingMap:
      return {
        state: 'saving',
        editingMode: currentState.editingMode,
        values: currentState.values
      };
    case Actions.MapDeleted:
      return {
        state: 'loaded',
        editingMode: currentState.editingMode,
        values: remove(currentState.values, action.map)
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
    case Actions.StartCreatingNewTurnEvent: {
      return Object.assign({}, currentState, {
        creatingNewTurnEvent: true
      });
    }
    case Actions.CancelCreatingNewTurnEvent: {
      return Object.assign({}, currentState, {
        creatingNewTurnEvent: false
      });
    }
    case Actions.StartEditingTurnEvent: {
      return Object.assign({}, currentState, {
        editingTurnEventId: action.turnEventId
      });
    }
    case Actions.SavingNewTurnEvent:
      return Object.assign({}, currentState, {
        state: 'saving'
      });
    case Actions.TurnEventSaved: {
      const withoutCreating = omit(currentState, 'creatingNewTurnEvent');
      return addTurnEvent(withoutCreating, action);
    }
    case Actions.DeletingTurnEvent: {
      return Object.assign({}, currentState, {
        state: 'saving'
      });
    }
    case Actions.TurnEventDeleted: {
      const currentMap = currentState.values[action.mapId];
      const turnEvents = currentMap.turnEvents;
      delete turnEvents[action.turnEventId];

      return Object.assign({}, omit(currentState, 'editingTurnEventId'), {
        state: 'loaded',
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      });
    }
    case Actions.TurnEventUpdated: {
      const withoutEditing = omit(currentState, 'editingTurnEventId');
      return addTurnEvent(withoutEditing, action);
    }
    case Actions.CancelEditingTurnEvent: {
      return omit(currentState, 'editingTurnEventId');
    }
    case Actions.SavingNewTriggerTile:
      return Object.assign({}, currentState, {
        state: 'saving'
      });
    case Actions.TriggerTileSaved: {
      const withoutPending = omit(currentState, 'pendingTriggerTilePosition');
      return addTriggerTile(withoutPending, action);
    }
    case Actions.TriggerTileUpdated: {
      const withoutEditing = omit(currentState, 'editingTriggerTileId');
      return addTriggerTile(withoutEditing, action);
    }
    case Actions.CancelEditingTriggerTile:
      return omit(currentState, 'editingTriggerTileId');
    case Actions.StartCreatingNewTriggerTile:
      return Object.assign({}, currentState, {
        pendingTriggerTilePosition: action.position
      });
    case Actions.CancelCreatingNewTriggerTile:
      return omit(currentState, 'pendingTriggerTilePosition');
    case Actions.StartEditingTriggerTile:
      return Object.assign({}, currentState, {
        editingTriggerTileId: action.triggerId
      });
    case Actions.DeletingTriggerTile:
      return Object.assign({}, currentState, {
        state: 'saving'
      });
    case Actions.TriggerTileDeleted: {
      const currentMap = currentState.values[action.mapId];
      const triggers = currentMap.triggerTiles;
      delete triggers[action.triggerId];

      return Object.assign({}, omit(currentState, 'editingTriggerTileId'), {
        state: 'loaded',
        editingTriggerTileId: null,
        values: Object.assign({}, currentState.values, {
          [action.mapId]: currentMap
        })
      });
    }
    default:
      return currentState || initialState.maps
  }
};
