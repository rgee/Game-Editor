import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import DialogueTypeSelector from './DialogueTypeSelector';
import { DialogueTypes } from '../../constants';

const styles = {
  width: 456
};

class NewDialogueForm extends React.Component {
  render () {
    const {
      open,
      isLoading,
      onDiscard,
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
            <Field
              name="displayName"
              component={(field) => {
                return (
                  <TextField id="displayName"
                    hintText="Display Name"
                    {...field.input}
                  />
                );
              }}
            />
            <h4 className="type-header">Type</h4>
            <Field
              name="type"
              component={(field) => <DialogueTypeSelector {...field.input} />}
            />
          </div>
        }
      </Dialog>
    );
  }
}

NewDialogueForm = reduxForm({
  form: 'newDialogue',
  initialValues: {
    type: DialogueTypes.Single
  }
})(NewDialogueForm);

export default NewDialogueForm;
