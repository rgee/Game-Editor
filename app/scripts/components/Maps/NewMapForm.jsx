import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextFormField from 'components/FormFields/Text';
import ImageUploadField from 'components/FormFields/ImageUpload';
import CircularProgress from 'material-ui/CircularProgress';
import ImageFileUploader from '../ImageFileUploader';

const styles = {
  width: 410
};

class NewMapForm extends React.Component {
  render() {
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
            <ImageUploadField
              width={200}
              height={200}
              name="background"
            />
            <TextFormField
              name="displayName"
              id="displayName"
              hintText="Display Name"
            />
            <TextFormField name="width" type="number" hintText="Width" />
            <TextFormField name="height" type="number" hintText="Height" />
          </div>
        }
      </Dialog>
    );
  }
}

NewMapForm = reduxForm({
  form: 'newMap'
})(NewMapForm);

export default NewMapForm;
