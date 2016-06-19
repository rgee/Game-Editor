import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/list';
import CircularProgress from 'material-ui/CircularProgress';

class Characters extends React.Component {
  render () {
    const { characters, isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    if (!characters.length) {
      return <h2>No Characters</h2>;
    }

    return (
      <List>
        {characters.map((character) => {
          return <ListItem key={character.name} primaryText={character.name} />;
        })}
      </List>
    )
  }
}

export default Characters;
