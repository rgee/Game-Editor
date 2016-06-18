import React, { PropTypes } from 'react'
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import AuthActions from '../actions/authActions';

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit(form) {
      dispatch(AuthActions.attemptLogin(form.email, form.password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
