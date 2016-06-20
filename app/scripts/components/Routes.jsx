import React, { PropTypes } from 'react';
import { hashHistory, Router, IndexRoute, Route } from 'react-router';
import Login from './Login';
import Home from './Home';
import App from './App';
import Characters from './Characters';
import Character from './Character';
import firebase from '../firebase';

class Routes extends React.Component {
  requireAuth(nextState, replace, callback) {
    const { isAwaitingAuthDecision, isLoggedIn } = this.props;
    if (isAwaitingAuthDecision) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          replace('/login');
        } else {
          replace('/characters');
        }
        callback();
      })
    } else if (!isLoggedIn) {
      replace('/login');
      callback();
    } else {
      callback();
    }
  }

  render() {
    const { onCharactersOpen } = this.props;
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <Route path="/login" component={Login} />
          <Route path="/test" component={Login} />
          <Route path="/characters" component={Characters} onEnter={onCharactersOpen} />
          <Route path="/characters/:characterName" component={Character} />
          <IndexRoute component={Home} onEnter={this.requireAuth.bind(this)} />
        </Route>
      </Router>
    );
  }
}

Routes.propTypes = {
  isAwaitingAuthDecision: React.PropTypes.bool,
  isLoggedIn: React.PropTypes.bool,
  onCharactersOpen: PropTypes.func.isRequired
};

export default Routes;
