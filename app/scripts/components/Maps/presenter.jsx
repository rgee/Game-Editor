import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import AddButton from '../AddButton';

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
          onTouchTap={() => {}}
          primaryText={map.displayName}
        />,
        <Divider key={index} />
      ];

      return result;
    });
  }

  render() {
    return (
      <div>
        <Paper style={styles.listPaper} zDepth={2}>
          {this.renderMapsList()}
          <AddButton onMouseDown={this.props.onAddClicked} />
        </Paper>
      </div>
    )
  }
}

Maps.PropTypes = {
  maps: PropTypes.array,
  isLoading: PropTypes.bool,
  isCreatingNew: PropTypes.bool,
  onAddClicked: PropTypes.func,
  fetchMaps: PropTypes.func
}

export default Maps;
