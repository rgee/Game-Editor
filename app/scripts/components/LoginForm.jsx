import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginForm extends React.Component {
  render () {
    const { fields: { email, password}, handleSubmit } = this.props;
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={handleSubmit}
      />
    ];

    return (
      <div>
        <Dialog
          title="Log In"
          actions={actions}
          modal={true}
          open={true}
        >
          <TextField id="email" hintText="Email" {...email} />
          <br />
          <TextField id="password" type="password" hintText="Password" {...password} />
        </Dialog>
      </div>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm);

export default LoginForm;
