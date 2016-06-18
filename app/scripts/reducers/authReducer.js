import { Actions } from '../constants';

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
    default:
      return currentState;
  }
};
