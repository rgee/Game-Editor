import React, { PropTypes } from 'react'
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';

class Text extends React.Component {
  render() {
    const { name, hintText, type } = this.props;
    return (
      <Field
        name={name}
        component={(field) => {
          return (
            <TextField
              {...field.input}
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
