import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import AddButton from '../AddButton';
import { ListItem } from 'material-ui/List';
import { flatMap } from 'lodash';
import { withRouter } from 'react-router';
import NewDialogueForm from './NewDialogueForm';

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
      <NewDialogueForm
        onSubmit={onConfirmClicked}
        onDiscard={onDiscardClicked}
      />
    );
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
          key={dialogue.id}
          onTouchTap={() => this.selectDialogue(dialogue.id)}
          primaryText={dialogue.displayName}
        />,
        <Divider key={index} />
      ];

      return result;
    });
  }

  renderAddButton() {
    const { onAddClicked } = this.props;
    return (
    );
  }

  render() {
    const { isCreatingNew } = this.props;
    return (
      <div>
        <Paper style={styles.listPaper} zDepth={2}>
            {this.renderDialougesArray()}
            {isCreatingNew ? null : this.renderAddButton()}
            {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

Dialogues.PropTypes = {
  dialogues: PropTypes.array,
  isSaving: PropTypes.bool,
  isLoading: PropTypes.bool,
  fetchDialogues: PropTypes.func,
  isCreatingNew: PropTypes.bool,
  onAddClicked: PropTypes.func,
  onDiscardClicked: PropTypes.func,
  onConformClicked: PropTypes.func
};

export default withRouter(Dialogues);
