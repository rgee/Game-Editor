import { connect } from 'react-redux';
import CharactersView from './presenter';
import CharactersActions from '../../actions/charactersActions';
import { reset } from 'redux-form';
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

    onNewCharacterConfirmed(character) {
      dispatch(CharactersActions.confirmNewCharacter(character));
    },

    onNewCharacterDiscarded() {
      dispatch(reset('newCharacter'));
      dispatch(CharactersActions.discardNewCharacter());
    },

    fetchCharacters() {
      dispatch(CharactersActions.load());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersView);
