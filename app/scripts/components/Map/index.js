import { connect } from 'react-redux';
import MapView from './presenter';


const mapStateToProps = (currentState, ownProps) => {
  return {
    backgroundImageUrl: 'http://i.imgur.com/OvB3Bhb.png',
    widthInTiles: 42,
    heightInTiles: 26,
    obstructions: [
      { x: 0, y: 0 },
      { x: 10, y: 5 }
    ]
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onObstructionAdd(position) {
      console.debug(`Add obstruction at (${position.x},${position.y})`)
    },

    onObstructionRemove(position) {
      console.debug(`Remove obstruction at (${position.x},${position.y})`)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
