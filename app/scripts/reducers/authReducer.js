import { Actions } from '../constants';
import initialState from '../store/initialstate';

export default (currentState, action) => {
  switch (action.type) {
    case Actions.Login:
      return {
        state: 'logged_in',
        user: action.user
      };
    case Actions.Logout:
      return {
        state: 'anonymous',
        user: null
      };
    case Actions.FetchingUser:
      return {
        state: 'fetching_user',
        user: null
      };
    default:
      return currentState || initialState.auth;
  }
};
