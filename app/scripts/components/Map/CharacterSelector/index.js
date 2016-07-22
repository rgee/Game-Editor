import { connect } from 'react-redux';
import View from './presenter';
import Actions from '../../../actions/charactersActions';
import { pick, bind, values as getValues } from 'lodash';

const mapStateToProps = (currentState, ownProps) => {
  const { characters: { values, state } } = currentState;
  const toIdentifiers = bind(pick, null, ['name', 'id']);
  return {
    isLoading: state === 'loading',
    characters: getValues(values).map(toIdentifiers)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCharacters() {
      dispatch(Actions.load())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
