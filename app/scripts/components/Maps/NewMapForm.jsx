import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TextFormField from 'components/FormFields/Text';
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
      fields: { displayName, width, height, background },
      handleSubmit
    } = this.props;

    const backgroundPreviewURL =
      background.value ? background.value.previewURL : null;

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
            <ImageFileUploader
              width={200}
              height={200}
              previewURL={backgroundPreviewURL}
              {...background}
            />
            <TextField id="displayName" hintText="Display Name" {...displayName} />
            <TextField type="number" hintText="Width" {...width} />
            <TextField type="number" hintText="Height" {...height} />
          </div>
        }
      </Dialog>
    );
  }
}

NewMapForm = reduxForm({
  form: 'newMap',
  fields: ['displayName', 'background', 'width', 'height']
})(NewMapForm);

export default NewMapForm;
