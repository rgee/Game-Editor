import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/list';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Characters extends React.Component {
  render () {
    const {
      isCreatingNewCharacter,
      onCharacterAddClicked,
      characters,
      isLoading
    } = this.props;

    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    if (!characters.length) {
      return <h2>No Characters</h2>;
    }

    return (
      <div>
        <List>
          {characters.map((character) => {
            return <ListItem key={character.name} primaryText={character.name} />;
          })}
        </List>
        {
          !isCreatingNewCharacter ?
          <FloatingActionButton onMouseDown={onCharacterAddClicked}>
            <ContentAdd />
          </FloatingActionButton> :
          null
        }
      </div>
    )
  }
}

Characters.PropTypes = {
  characters: PropTypes.array,
  isLoading: PropTypes.bool,
  isCreatingNewCharacter: PropTypes.bool,
  onCharacterAddClicked: PropTypes.func
};

export default Characters;
