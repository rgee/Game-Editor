import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';

class ImageFileUploader extends React.Component {
  handleFile(e) {
    const reader = new FileReader();
    const files = e.target.files;
    if (files.length <= 0) {
      this.props.onChange(null);
      return;
    }

    const file = files[0];
    reader.onloadend = () => {
      this.props.onChange({
        file,
        previewURL: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  renderPreview() {
    const { width, height, previewURL } = this.props;
    if (!previewURL) {
      return null;
    }

    return <img width={width} height={height} src={previewURL} />;
  }

  render() {
    return (
      <div>
        {this.renderPreview()}
        <input type="file" onChange={this.handleFile.bind(this)} />
      </div>
    );
  }
}

ImageFileUploader.PropTypes = {
  onChange: PropTypes.func,
  previewURL: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default ImageFileUploader;
