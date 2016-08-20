import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import DialogueTypeSelector from './DialogueTypeSelector';

const styles = {
  width: 456
};

class NewDialogueForm extends React.Component {
  render () {
    const {
      open,
      isLoading,
      onDiscard,
      fields: { displayName, type },
      handleSubmit
    } = this.props;


    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={onDiscard}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={handleSubmit}
      />
    ];

    return (
      <Dialog
        title="New Dialogue"
        modal={true}
        contentStyle={styles}
        actions={actions}
        open={true}
      >
        {
          isLoading ?
          <CircularProgress size={2} /> :
          <div>
            <TextField id="displayName" hintText="Display Name" {...displayName} />
            <h4 className="type-header">Type</h4>
            <DialogueTypeSelector {...type} />
          </div>
        }
      </Dialog>
    );
  }
}

NewDialogueForm = reduxForm({
  form: 'newDialogue',
  fields: ['displayName', 'type']
})(NewDialogueForm);

export default NewDialogueForm;
