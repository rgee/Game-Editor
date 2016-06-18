import React from 'react'
import Store from '../store';
import { Route } from 'react-router';

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default App;
