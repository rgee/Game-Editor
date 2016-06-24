import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ImageFileUploader from '../ImageFileUploader';


class NewCharacterForm extends React.Component {
  render() {
    const {
      open,
      onNewCharacterDiscarded,
      fields: { name, portrait },
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

    const previewURL = portrait.value ? portrait.value.previewURL : null;

    return (
      <Dialog
        title="New Character"
        modal={true}
        actions={actions}
        open={true}
      >
        <ImageFileUploader previewURL={previewURL} {...portrait} />
        <TextField id="name" hintText="Name" {...name} />
      </Dialog>
    );
  }
}

NewCharacterForm = reduxForm({
  form: 'newCharacter',
  fields: ['name', 'portrait']
})(NewCharacterForm);

export default NewCharacterForm;
