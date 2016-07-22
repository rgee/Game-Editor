import React, { PropTypes } from 'react'

class CharacterSelector extends React.Component {
  componentWillMount() {
    this.props.fetchCharacters();
  }

  render() {
    const { characters } = this.props;
    console.debug(characters);
    
    return (
      <div></div>
    );
  }
}

CharacterSelector.PropTypes = {
  isLoading: PropTypes.bool,

  characters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  })),

  onCharacterSelected: PropTypes.func,

  fetchCharacters: PropTypes.func
};

export default CharacterSelector;
