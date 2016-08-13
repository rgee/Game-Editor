import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class TurnEventEditor extends React.Component {
  render() {
    const {
      editing,
      handleSubmit,
      onCancel,
      onDiscard,
      fields: { eventName, turn }
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
        <div>
          <TextField style={{ display: 'block' }} type="number" hintText="Turn" {...turn} />
          <TextField stlye={{ display: 'block' }} hintText="Event Name" {...eventName} />
        </div>
      </Dialog>
    );
  }
}

TurnEventEditor = reduxForm({
  form: 'turnEvent',
  fields: ['eventName', 'turn']
})(TurnEventEditor);

TurnEventEditor.PropTypes = {
  editing: PropTypes.bool,
  onDiscard: PropTypes.func,
  onCancel: PropTypes.func
};

export default TurnEventEditor ;
