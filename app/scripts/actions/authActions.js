import { Actions } from '../constants';
import firebase from '../firebase';

export default {
  listenToAuth() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingUser });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: Actions.Login,
            user: user
          });
        } else {
          dispatch({ type: Actions.Logout });
        }
      });
    };
  },

  logout() {
    return (dispatch) => {
      dispatch({ type: Actions.AttemptingLogout });
      firebase.auth().signOut().then(
        () => {
          dispatch({ type: Actions.Logout });
        }
      );
    };
  },

  attemptLogin(email, password) {
    return (dispatch) => {
      dispatch({ type: Actions.AttemptingLogin });
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          dispatch({
            type: Actions.Login,
            user: user
          });
        },
        (error) => {
          const { code, message } = error;
          console.error('Failed login.', code, message);
          dispatch({ type: Actions.Logout });
        }
      );
    };
  }
};
