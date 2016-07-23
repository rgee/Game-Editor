import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class TriggerEditor extends React.Component {
  render() {
    const {
      editing,
      handleSubmit,
      onCancel,
      onDiscard,
      fields: { eventName, description }
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={onCancel}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={handleSubmit}
      />
    ];

    if (editing) {
      actions.push(<RaisedButton label="Delete" onTouchTap={onDiscard} />);
    }

    return (
      <Dialog
        title="Edit Trigger"
        modal={true}
        open={true}
        actions={actions}
      >
        <div>
          <TextField hintText="Event Name" {...eventName} />
          <TextField
            hintText="Description"
            multiLine={true}
            rows={2}
            rowsMax={4}
            {...description}
          />
        </div>
      </Dialog>
    );
  }
}

TriggerEditor = reduxForm({
  form: 'trigger',
  fields: ['eventName', 'description']
})(TriggerEditor);

TriggerEditor.PropTypes = {
  editing: PropTypes.bool,
  onDiscard: PropTypes.func,
  onCancel: PropTypes.func
};

export default TriggerEditor;
