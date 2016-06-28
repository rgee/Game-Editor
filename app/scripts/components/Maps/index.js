import { connect } from 'react-redux';
import MapsView from './presenter';
import { values as getValues } from 'lodash';
import Actions from '../../actions/mapsActions';

const mapStateToProps = (currentState) => {
  const { maps: { values, state } } = currentState;
  return {
    isLoading: state === 'loading',
    isSaving: state === 'saving',
    isCreatingNew: state === 'creating_new',
    maps: getValues(values)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaps() {
      dispatch(Actions.load());
    },

    onConfirmClicked(map) {
      dispatch(Actions.create(map));
    },

    onDiscardClicked() {
      dispatch(Actions.discardNewMap());
    },

    onAddClicked() {
      dispatch(Actions.startNewMapCreation());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapsView);
