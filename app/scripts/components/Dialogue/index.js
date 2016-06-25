import { connect } from 'react-redux';
import Dialogue from './presenter';

const mapStateToProps = (state) => {
  return {
    dialogue: {
      displayName: 'Test Dialogue'
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue);
