import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCharacterForm from './NewCharacterForm';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

const styles = {
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500
  }
};

class Characters extends React.Component {
  componentDidMount() {
    this.props.fetchCharacters();
  }

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

  goToCharacter(name) {
    const { router } = this.props;
    router.push({
      pathname: `/characters/${name}`
    });
  }

  renderContent() {
    const { characters } = this.props;
    if (!characters.length) {
      return <h2>No Characters</h2>;
    }

    return (
      <div style={styles.gridRoot}>
        <GridList cellHeight={200} style={styles.gridList}>
          {characters.map((character) => {
            return (
              <GridTile
                key={character.name}
                title={character.name}
                onTouchTap={this.goToCharacter.bind(this, character.name)}
              >
                <img src={character.portraitURL} />
              </GridTile>

            );
          })}
        </GridList>
      </div>
    );
  }

  render() {
    const {
      isCreatingNewCharacter,
      onCharacterAddClicked,
      isLoading
    } = this.props;

    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    return (
      <div>
        {this.renderContent()}
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
  onCharacterAddClicked: PropTypes.func,
  fetchCharacters: PropTypes.func
};

export default withRouter(Characters);
