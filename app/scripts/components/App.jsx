import React, { PropTypes } from 'react'
import Store from '../store';
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    return (<Provider store={Store}>
        <div>Hello, World!</div>
      </Provider>
    );
  }
}

export default App;
