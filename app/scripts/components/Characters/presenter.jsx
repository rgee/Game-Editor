import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/list';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCharacterForm from './NewCharacterForm';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class Characters extends React.Component {
  renderNewCharacterForm() {
    const {
      isCreatingNewCharacter,
      onNewCharacterConfirmed,
      onNewCharacterDiscarded
    } = this.props;

    if (!isCreatingNewCharacter) {
      return null;
    }

    return (
      <NewCharacterForm
        onSubmit={onNewCharacterConfirmed}
        onNewCharacterDiscarded={onNewCharacterDiscarded}
      />
    );
  }

  render() {
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
            return (
              <ListItem
                key={character.name}
                primaryText={<Link to={`/characters/${character.name}`}>{character.name}</Link>}
              />
            );
          })}
        </List>
        {
          !isCreatingNewCharacter ?
          <FloatingActionButton onMouseDown={onCharacterAddClicked}>
            <ContentAdd />
          </FloatingActionButton> :
          null
        }
        {this.renderNewCharacterForm()}
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
