import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { flatMap } from 'lodash';

const styles = {
  listPaper: {
    width: 400,
    margin: '40px auto'
  }
};

class Dialogues extends React.Component {
  renderDialougesArray() {
    const { dialogues } = this.props;
    return flatMap(dialogues, (dialogue, index, collection) => {
      const result = [
        <ListItem
          onTouchTap={() => this.selectDialogue(dialogue.id)}
          primaryText={dialogue.name}
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
  dialogues: PropTypes.array
};

export default Dialogues;
