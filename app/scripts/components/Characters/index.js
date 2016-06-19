import { connect } from 'react-redux';
import CharactersView from './presenter';
import { values as getValues } from 'lodash';

const mapStateToProps = (currentState) => {
  const { characters: { values, state } } = currentState;
  return {
    characters: getValues(values),
    isLoading: state !== 'loaded'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersView);
