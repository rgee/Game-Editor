import React, { PropTypes } from 'react';
import { hashHistory, Router, IndexRoute, Route } from 'react-router';
import Login from './Login';
import Home from './Home';
import App from './App';


class Routes extends React.Component {
  requireAuth(nextState, replace) {
    const { isAwaitingAuthDecision, isLoggedIn } = this.props;
    if (!isAwaitingAuthDecision && !isLoggedIn) {
      replace('/login');
    }
  }

  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <Route path="/login" component={Login} />
          <Route path="/test" component={Login} />
          <IndexRoute component={Home} onEnter={this.requireAuth.bind(this)}/>
        </Route>
      </Router>
    );
  }
}

Routes.propTypes = {
  isAwaitingAuthDecision: React.PropTypes.bool,
  isLoggedIn: React.PropTypes.bool
};

export default Routes;
