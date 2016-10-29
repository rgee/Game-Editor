import React, { PropTypes } from 'react'
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import { omit } from 'lodash';

class Text extends React.Component {
  render() {
    const textProps = omit(this.props, 'name');

    const {
      name,
      hintText,
      type,
    } = this.props;
    return (
      <Field
        name={this.props.name}
        component={(field) => {
          const { meta: { touched, error } } = field;
          return (
            <TextField
              {...field.input}
              errorText={touched && error ? error : null}
              {...textProps}
            />
          );
        }}
      />
    );
  }
}

export default Text;
