import React, { PropTypes } from 'react'
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';

class Text extends React.Component {
  render() {
    const { name, hintText, type } = this.props;
    return (
      <Field
        component={(field) => {
          return (
            <TextField
              {...field.input}
              name={name}
              hintText={hintText}
              type={type}
            />
          );
        }}
      />
    );
  }
}

export default Text;
