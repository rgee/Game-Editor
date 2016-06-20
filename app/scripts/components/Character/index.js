import { connect } from 'react-redux';
import CharacterView from './presenter';
import CharactersActions from '../../actions/charactersActions';
import { find } from 'lodash';

const mapStateToProps = (currentState, ownProps) => {
  const characters = currentState.characters.values;
  const state = currentState.characters.state;
  const characterName = ownProps.params.characterName;
  return {
    character: find(characters, { name: characterName }),
    isLoading: state === 'deleting'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCharacterRemoveClicked(character) {
      dispatch(CharactersActions.deleteCharacter(character))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView);
