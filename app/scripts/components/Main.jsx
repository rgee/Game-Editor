import React, { PropTypes } from 'react'
import Store from '../store';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import VisibleRoutes from './VisibleRoutes';

class Main extends React.Component {
  render () {
    return (
      <Provider store={Store}>
        <VisibleRoutes />
      </Provider>
    );
  }
}

export default Main;
