import React, { PropTypes } from 'react'

class Dialogue extends React.Component {
  render() {
    const { dialogue } = this.props;
    return (
      <div>
        <h2>{dialogue.displayName}</h2>
      </div>
    );
  }
}

Dialogue.PropTypes = {
  dialogue: PropTypes.object
};

export default Dialogue;
