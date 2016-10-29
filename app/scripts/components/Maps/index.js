import { connect } from 'react-redux';
import MapsView from './presenter';
import { values as getValues } from 'lodash';
import Actions from '../../actions/mapsActions';

const mapStateToProps = (currentState) => {
  const { maps: { values, editingMapId, state } } = currentState;
  const editingMap = editingMapId ? values[editingMapId] : null;
  return {
    isLoading: state === 'loading',
    isSaving: state === 'saving',
    isCreatingNew: state === 'creating_new',
    isEditing: state === 'editing',
    maps: getValues(values),
    editingMap
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaps() {
      dispatch(Actions.load());
    },

    onConfirmClicked(map) {
      dispatch(Actions.save(map));
    },

    onMapEditClicked(map) {
      dispatch(Actions.editMapAttributes(map.id))
    },

    onDiscardClicked() {
      dispatch(Actions.discardMap());
    },

    onEditClicked(map) {
      dispatch(Actions.startNewMapEditing(map));
    },

    onAddClicked() {
      dispatch(Actions.startNewMapCreation());
    },

    onMapDeleteClicked(map) {
      dispatch(Actions.deleteMap(map));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapsView);
