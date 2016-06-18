import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Login from './Login';
import Home from './Home';


class Routes extends React.Component {
  requireAuth(nextState, replace) {
    const { auth } = this.context.store.getState();
    if (auth.state != 'logged_in') {
      replace({
        pathname: '/login'
      });
    }
  },

  render () {
    return (
      <Route path="/" component={App} onEnter={this.requireAuth} >
        <Route path="login" component={Login} />
        <Route path="home" component={Home} />
      </Route>
    );
  }
}
