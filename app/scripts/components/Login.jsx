import React, { PropTypes } from 'react'
import LoginForm from './LoginForm';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit(form) {
      console.log("submitting ", form);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
