import { connect } from 'react-redux';
import MapView from './presenter';
import Actions from '../../actions/mapsActions';
import { keys, find } from 'lodash';


const mapStateToProps = (currentState, ownProps) => {
  const maps = currentState.maps.values;
  const map = find(maps, { id: ownProps.params.mapId });
  if (!map) {
    return {
      backgroundImageUrl: 'http://i.imgur.com/OvB3Bhb.png',
      widthInTiles: 42,
      heightInTiles: 26,
      obstructions: []
    };
  }

  const obstructionKeys = keys(map.obstructions || {});
  const obstructions = obstructionKeys.map((key) => {
    return Object.assign({}, { id: key }, map.obstructions[key]);
  });

  return {
    backgroundImageUrl: 'http://i.imgur.com/OvB3Bhb.png',
    widthInTiles: 42,
    heightInTiles: 26,
    obstructions: obstructions || []
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onObstructionAdd(position) {
      dispatch(Actions.addObstruction(position, ownProps.params.mapId));
    },

    onObstructionRemove(obstruction) {
      console.debug(`Remove obstruction at (${position.x},${position.y})`)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
