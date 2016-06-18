import { Actions } from '../constants';
import firebase from '../firebase';

export default {
  listenToAuth() {
    return (dispatch, getState) => {
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
  }
};
