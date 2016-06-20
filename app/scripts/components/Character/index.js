import { connect } from 'react-redux';
import CharacterView from './presenter';
import { find } from 'lodash';

const mapStateToProps = (currentState, ownProps) => {
  const characters = currentState.characters.values;
  const characterName = ownProps.params.characterName;
  return {
    character: find(characters, { name: characterName })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };  
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView);
