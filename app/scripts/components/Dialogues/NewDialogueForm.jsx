import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  width: 410
};

class NewDialogueForm extends React.Component {
  render () {
    const {
      open,
      isLoading,
      onDiscard,
      fields: { displayName },
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
          <TextField id="displayName" hintText="Display Name" {...displayName} />
        }
      </Dialog>
    );
  }
}

NewDialogueForm = reduxForm({
  form: 'newDialogue',
  fields: ['displayName']
})(NewDialogueForm);

export default NewDialogueForm;
