import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class CharacterSelector extends React.Component {
  componentWillMount() {
    this.props.fetchCharacters();
  }

  handleCharacterClick(id) {
    this.props.onCharacterSelected(id);
  }

  renderContent() {
    const { characters, isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress size={2} />;
    }
    return (
      <div>
        {characters.map((character) => {
          return (
            <ListItem
              key={character.id}
              onTouchTap={this.handleCharacterClick.bind(this, character.id)}
              primaryText={character.name}
            />
          );
        })}
      </div>
    )
  }

  render() {
    const { onDiscard } = this.props;

    return (
      <Dialog
        title="New Spawn Point"
        modal={true}
        open={true}
        actions={[
          <FlatButton label="Cancel" onTouchTap={onDiscard} />
        ]}
      >
        {this.renderContent()}
      </Dialog>
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
  onDiscard: PropTypes.func,

  fetchCharacters: PropTypes.func
};

export default CharacterSelector;
