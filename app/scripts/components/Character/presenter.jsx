import React, { PropTypes } from 'react'

class Character extends React.Component {
  render() {
    const { character: { name } } = this.props;
    return (
      <div>
        <h2>{name}</h2>
      </div>
    );
  }
}

export default Character;
