import React, { PropTypes } from 'react';
import { hashHistory, Router, IndexRoute, Route } from 'react-router';
import Login from './Login';
import Home from './Home';
import App from './App';
import Dialogues from './Dialogues';
import Dialogue from './Dialogue';
import SingleMap from './Map';
import Maps from './Maps';
import Characters from './Characters';
import Character from './Character';
import firebase from 'firebase-client';

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
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <Route path="/login" component={Login} />
          <Route path="/characters" component={Characters} />
          <Route path="/characters/:characterName" component={Character} />
          <Route path="/dialogues" component={Dialogues} />
          <Route path="/dialogues/:dialogueId" component={Dialogue} />
          <Route path="/maps" component={Maps} />
          <Route path="/maps/:mapId" component={SingleMap} />
          <IndexRoute component={Home} onEnter={this.requireAuth.bind(this)} />
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
