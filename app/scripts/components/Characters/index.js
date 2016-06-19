import { connect } from 'react-redux';
import CharactersView from './presenter';
import CharactersActions from '../../actions/charactersActions';
import { values as getValues } from 'lodash';

const mapStateToProps = (currentState) => {
  const { characters: { values, state } } = currentState;
  return {
    characters: getValues(values),
    isLoading: state === 'loading',
    isCreatingNewCharacter: state === 'creating_new_character'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCharacterAddClicked() {
      dispatch(CharactersActions.startNewCharacterCreation());
    },

    onNewCharacterConfirmed() {
      dispatch(CharactersActions.confirmNewCharacter());
    },

    onNewCharacterDiscarded() {
      dispatch(CharactersActions.discardNewCharacter());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersView);
