import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ImageFileUploader from '../ImageFileUploader';

class NewCharacterForm extends React.Component {
  renderPortraitUploader(field) {
    const { input } = field;
    return (
      <ImageFileUploader
        {...input}
        width={200}
        height={200}
        previewURL={input.value.previewURL}
      />
    );
  }

  render() {
    const {
      open,
      onNewCharacterDiscarded,
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
      <Field
        name="portrait"
        component={this.renderPortraitUploader}
      />
      <Field
        name="name"
        component={(field) => {
          return (
            <TextField
              {...field.input}
              id="name"
              hintText="Name"
            />
          );
        }}
      />
      </Dialog>
    );
  }
}

NewCharacterForm = reduxForm({
  form: 'newCharacter'
})(NewCharacterForm);

export default NewCharacterForm;
