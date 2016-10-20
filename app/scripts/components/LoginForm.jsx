import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

class LoginForm extends React.Component {
  renderText(field) {
    return (
      <TextField
        {...field.input}
        id={field.id}
        hintText={field.hintText}
        type={field.type}
      />
    );
  }

  render () {
    const { isLoggingIn, fields: { email, password }, handleSubmit } = this.props;
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
          {
            isLoggingIn ?
            <CircularProgress size={1.5} /> :
            <div>
              <Field
                id="email"
                hintText="Email"
                name="email"
                type="text"
                component={renderText}
              />
              <br />
              <TextField
                id="password"
                type="password"
                hintText="Password"
                {...password}
              />
            </div>
          }
        </Dialog>
      </div>
    );
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
