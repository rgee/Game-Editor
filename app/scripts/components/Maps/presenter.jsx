import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import AddButton from '../AddButton';
import NewMapForm from './NewMapForm';
import { flatMap } from 'lodash';
import { withRouter } from 'react-router';

const styles = {
  listPaper: {
    width: 400,
    margin: '40px auto'
  }
};

class Maps extends React.Component {
  componentDidMount() {
    this.props.fetchMaps();
  }

  goToMap(id) {
    const { router } = this.props;
    router.push({
      pathname: `/maps/${id}`
    });
  }

  renderForm() {
    const {
      isCreatingNew,
      onDiscardClicked,
      onConfirmClicked,
      isSaving
    } = this.props;

    if (!(isSaving || isCreatingNew)) {
      return null;
    }

    return (
      <NewMapForm
        onSubmit={onConfirmClicked}
        onDiscard={onDiscardClicked}
      />
    );
  }

  renderMapsList() {
    const { maps, isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    if (!maps.length) {
      return <h2>No Maps</h2>;
    }

    return flatMap(maps, (map, index, collection) => {
      const result = [
        <ListItem
          key={map.id}
          onTouchTap={this.goToMap.bind(this, map.id)}
          primaryText={map.displayName}
        />,
        <Divider key={index} />
      ];

      return result;
    });
  }

  render() {
    const { isCreatingNew, onAddClicked } = this.props;
    return (
      <div>
        <Paper style={styles.listPaper} zDepth={2}>
          {this.renderMapsList()}
          {isCreatingNew ? null : <AddButton onMouseDown={onAddClicked} /> }
          {this.renderForm()}
        </Paper>
      </div>
    )
  }
}

Maps.PropTypes = {
  maps: PropTypes.array,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  isCreatingNew: PropTypes.bool,
  onAddClicked: PropTypes.func,
  onConfirmClicked: PropTypes.func,
  onDiscardClicked: PropTypes.func,
  fetchMaps: PropTypes.func
}

export default withRouter(Maps);
