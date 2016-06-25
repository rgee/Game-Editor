import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import { flatMap } from 'lodash';
import { withRouter } from 'react-router';

const styles = {
  listPaper: {
    width: 400,
    margin: '40px auto'
  }
};

class Dialogues extends React.Component {
  componentDidMount() {
    this.props.fetchDialogues();
  }

  selectDialogue(id) {
    this.props.router.push(`/dialogues/${id}`);
  }

  renderDialougesArray() {
    const { dialogues, isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress size={2} />;
    }

    if (!dialogues.length) {
      return <h2>No Dialogues</h2>;
    }

    return flatMap(dialogues, (dialogue, index, collection) => {
      const result = [
        <ListItem
          onTouchTap={() => this.selectDialogue(dialogue.id)}
          primaryText={dialogue.displayName}
        />
      ];

      if (index !== collection.length - 1) {
        result.push(<Divider />);
      }

      return result;
    });
  }

  render() {
    return (
      <div>
        <Paper style={styles.listPaper} zDepth={2}>
          <List>
            {this.renderDialougesArray()}
          </List>
        </Paper>
      </div>
    );
  }
}

Dialogues.PropTypes = {
  dialogues: PropTypes.array,
  isLoading: PropTypes.bool,
  fetchDialogues: PropTypes.func
};

export default withRouter(Dialogues);
