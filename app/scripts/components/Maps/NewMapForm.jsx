import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  width: 410
};

class NewMapForm extends React.Component {
  render() {
    const {
      open,
      isLoading,
      onDiscard,
      fields: { displayName, width, height },
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
            <TextField type="number" hintText="width" {...width} />
            <TextField type="number" hintText="height" {...height} />
          </div>
        }
      </Dialog>
    );
  }
}

NewMapForm = reduxForm({
  form: 'newMap',
  fields: ['displayName', 'width', 'height']
})(NewMapForm);

export default NewMapForm;
