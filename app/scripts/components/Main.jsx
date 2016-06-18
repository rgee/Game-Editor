import React, { PropTypes } from 'react'
import Store from '../store';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import Routes from './Routes';

class Main extends React.Component {
  render () {
    return (
      <Provider store={Store}>
        <Router history={browserHistory} routes={Routes} />
      </Provider>
    );
  }
}

export default Main;
