import { connect } from 'react-redux';
import MapView from './presenter';
import Actions from '../../actions/mapsActions';
import { keys, find } from 'lodash';
import Modes from './modes';


const mapStateToProps = (currentState, ownProps) => {
  const mapState = currentState.maps;
  const maps = mapState.values;
  const map = find(maps, { id: ownProps.params.mapId });
  if (!map) {
    return {
      backgroundImageUrl: 'http://i.imgur.com/tIoHnXA.png',
      widthInTiles: 0,
      heightInTiles: 0,
      mode: mapState.editingMode,
      isCreatingSpawnPoint: !!mapState.pendingSpawnPosition,
      isCreatingTriggerTile: !!mapState.pendingTriggerTilePosition,
      isEditingTriggerTile: !!mapState.editingTriggerTileId,
      editingTriggerTileId: mapState.editingTriggerTileId,
      obstructions: [],
      triggerTiles: []
    };
  }

  const toArrayWithId = (object) => {
    const objKeys = object ? keys(object) : [];
    return objKeys.map((key) => {
      return Object.assign({}, { id: key }, object[key]);
    });
  }

  return {
    backgroundImageUrl: 'http://i.imgur.com/tIoHnXA.png',
    widthInTiles: map.width,
    heightInTiles: map.height,
    mode: mapState.editingMode,
    isCreatingTurnEvent: mapState.creatingNewTurnEvent,
    isCreatingSpawnPoint: !!mapState.pendingSpawnPosition,
    isCreatingTriggerTile: !!mapState.pendingTriggerTilePosition,
    isEditingTriggerTile: !!mapState.editingTriggerTileId,
    editingTriggerTileId: mapState.editingTriggerTileId,
    obstructions: toArrayWithId(map.obstructions),
    spawnPoints: toArrayWithId(map.spawnPoints),
    triggerTiles: toArrayWithId(map.triggerTiles),
    turnEvents: [
      {
        turn: 2,
        eventName: 'test-turn-2'
      },
      {
        turn: 2,
        eventName: 'test-turn-2-again'
      },
      {
        turn: 4,
        eventName: 'die'
      }
    ]
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTurnEventAdd() {
      dispatch(Actions.startCreatingNewTurnEvent());
    },

    onTurnEventCancel() {
      dispatch(Actions.cancelCreatingNewTurnEvent());
    },

    onObstructionAdd(position) {
      dispatch(Actions.addObstruction(position, ownProps.params.mapId));
    },

    onObstructionRemove(obstructionKey) {
      dispatch(Actions.removeObstruction(obstructionKey, ownProps.params.mapId));
    },

    onNewModeSelected(mode) {
      dispatch(Actions.changeEditingMode(mode));
    },

    onSpawnPointRemove(spawnPointKey) {
      dispatch(Actions.removeSpawnPoint(spawnPointKey, ownProps.params.mapId));
    },

    onSpawnPointAdd(position) {
      dispatch(Actions.startCreatingNewSpawnPoint(position));
    },

    onNewSpawnPointConfirmed(characterId) {
      const { params: { mapId } } = ownProps;
      dispatch(Actions.saveNewSpawnPoint(characterId, mapId));
    },

    onSpawnPointCancel() {
      dispatch(Actions.cancelCreatingNewSpawnPoint());
    },

    onTriggerTileEditStart(triggerId) {
      dispatch(Actions.editTriggerTile(triggerId));
    },

    onTriggerTileEditSave(triggerKey, trigger) {
      dispatch(Actions.updateEditingTriggerTile(trigger, triggerKey, ownProps.params.mapId));
    },

    onTriggerTileAdd(position) {
      dispatch(Actions.startCreatingNewTriggerTile(position));
    },

    onTriggerTileCancel() {
      dispatch(Actions.cancelCreatingNewTriggerTile());
    },

    onTriggerDelete(triggerId) {
      dispatch(Actions.deleteTrigger(triggerId, ownProps.params.mapId));
    },

    onTriggerEditCancel() {
      dispatch(Actions.cancelEditingTriggerTile());
    },

    onTriggerTileSave(trigger) {
      const { params: { mapId } } = ownProps;
      dispatch(Actions.saveNewTriggerTile(trigger, mapId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
