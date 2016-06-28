import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
};

class AddButton extends React.Component {
  render() {
    return (
      <FloatingActionButton {...this.props} style={styles}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

export default AddButton;
