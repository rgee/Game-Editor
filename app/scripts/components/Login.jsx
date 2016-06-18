import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
  render () {
    const actions = [];
    return (
      <div>
        <Dialog
          title="Log In"
          actions={actions}
          modal={true}
          open={true}
        >
          <TextField id="email" hintText="Email" />
          <br />
          <TextField id="password" type="password" hintText="Password" />
        </Dialog>
      </div>
    );
  }
}

export default Login;
