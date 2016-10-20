import React, { PropTypes } from 'react'
import { Field } from 'redux-form';
import ImageFileUploader from 'components/ImageFileUploader';

class ImageUpload extends React.Component {
  render() {
    const { name, width, height } = this.props;
    return (
      <Field
        name={name}
        component={(field) => {
          const { input } = field;
          return (
            <ImageFileUploader
              {...input}
              width={width}
              height={height}
              previewURL={input.value.previewURL}
            />
          );
        }}
      />
    );
  }
}

export default ImageUpload;
