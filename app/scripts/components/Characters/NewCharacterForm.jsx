import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class NewCharacterForm extends React.Component {
  render() {
    const {
      open,
      onNewCharacterDiscarded,
      fields: { name },
      handleSubmit
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={onNewCharacterDiscarded}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={handleSubmit}
      />
    ];

    return (
      <Dialog
        title="New Character"
        modal={true}
        actions={actions}
        open={true}
      >
        <TextField id="name" hintText="Name" {...name} />
      </Dialog>
    );
  }
}

NewCharacterForm = reduxForm({
  form: 'newCharacter',
  fields: ['name']
})(NewCharacterForm);

export default NewCharacterForm;
