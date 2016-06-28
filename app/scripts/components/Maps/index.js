import { connect } from 'react-redux';
import MapsView from './presenter';
import { values as getValues } from 'lodash';
import Actions from '../../actions/mapsActions';

const mapStateToProps = (currentState) => {
  const { maps: { values, state } } = currentState;
  return {
    isLoading: state === 'loading',
    maps: getValues(values)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaps() {
      dispatch(Actions.load());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapsView);
