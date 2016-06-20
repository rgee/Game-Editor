import React, { PropTypes } from 'react'
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import { withRouter } from 'react-router';

class Character extends React.Component {
  handleRemoveClicked() {
    const { character, onCharacterRemoveClicked } = this.props;
    onCharacterRemoveClicked(character);
    this.props.router.goBack();
  }

  render() {
    const { isLoading, character, onCharacterRemoveClicked } = this.props;
    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    return (
      <div>
        <h2>{character.name}</h2>
        <FloatingActionButton onMouseDown={this.handleRemoveClicked.bind(this)}>
          <ContentRemove />
        </FloatingActionButton> :
      </div>
    );
  }
}

export default withRouter(Character);
