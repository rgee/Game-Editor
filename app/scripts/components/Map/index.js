import { connect } from 'react-redux';
import MapView from './presenter';
import Actions from '../../actions/mapsActions';
import { keys, find } from 'lodash';
import Modes from './modes';


const mapStateToProps = (currentState, ownProps) => {
  const maps = currentState.maps.values;
  const map = find(maps, { id: ownProps.params.mapId });
  if (!map) {
    return {
      backgroundImageUrl: 'http://i.imgur.com/tIoHnXA.png',
      widthInTiles: 0,
      heightInTiles: 0,
      mode: currentState.maps.editingMode,
      obstructions: []
    };
  }

  const obstructionKeys = keys(map.obstructions || {});
  const obstructions = obstructionKeys.map((key) => {
    return Object.assign({}, { id: key }, map.obstructions[key]);
  });

  return {
    backgroundImageUrl: 'http://i.imgur.com/tIoHnXA.png',
    widthInTiles: map.width,
    heightInTiles: map.height,
    mode: currentState.maps.editingMode,
    obstructions: obstructions || []
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onObstructionAdd(position) {
      dispatch(Actions.addObstruction(position, ownProps.params.mapId));
    },

    onObstructionRemove(obstructionKey) {
      dispatch(Actions.removeObstruction(obstructionKey, ownProps.params.mapId));
    },

    onNewModeSelected(mode) {
      dispatch(Actions.changeEditingMode(mode));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
