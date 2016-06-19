import React, { PropTypes } from 'react'
import MenuBar from './MenuBar';

class Home extends React.Component {
  render() {
    return (
      <div>
        <MenuBar />
        {this.props.children}
      </div>
    );
  }
}


export default Home;
