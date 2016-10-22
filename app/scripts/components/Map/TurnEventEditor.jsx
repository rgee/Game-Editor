import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextFormField from 'components/FormFields/Text';
import CircularProgress from 'material-ui/CircularProgress';

class TurnEventEditor extends React.Component {
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
        title="Edit Turn Event"
        modal={true}
        open={true}
        actions={actions}
      >
        <TextFormField
          name="turn"
          style={{ display: 'block' }}
          type="number"
          hintText="Turn"
        />
        <TextFormField
          name="eventName"
          stlye={{ display: 'block' }}
          hintText="Event Name"
        />
      </Dialog>
    );
  }
}

TurnEventEditor = reduxForm({ form: 'turnEvent' })(TurnEventEditor);

TurnEventEditor.PropTypes = {
  editing: PropTypes.bool,
  onDiscard: PropTypes.func,
  onCancel: PropTypes.func
};

export default TurnEventEditor;
