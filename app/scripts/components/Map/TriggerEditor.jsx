import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextFormField from 'components/FormFields/Text';
import CircularProgress from 'material-ui/CircularProgress';

class TriggerEditor extends React.Component {
  render() {
    const {
      editing,
      handleSubmit,
      onCancel,
      onDiscard
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
        <TextFormField name="eventName" hintText="Event Name" />
        <TextFormField
          name="description"
          hintText="Description"
          multiLine={true}
          rows={2}
          rowsMax={4}
        />
      </Dialog>
    );
  }
}

TriggerEditor = reduxForm({
  form: 'trigger'
})(TriggerEditor);

TriggerEditor.PropTypes = {
  editing: PropTypes.bool,
  onDiscard: PropTypes.func,
  onCancel: PropTypes.func
};

export default TriggerEditor;
