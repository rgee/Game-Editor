import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

const styles = {
  listPaper: {
    width: 400
  }
};

class Dialogues extends React.Component {
  render() {
    const { dialogues } = this.props;
    return (
      <div>
        <Paper style={styles.listPaper} zDepth={2}>
          <List>
            {dialogues.map((dialogue) => {
              return (
                <ListItem
                  onTouchTap={() => this.selectDialogue(dialogue.id)}
                  primaryText={dialogue.name}
                />
              );
            })}
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
