
import { Actions } from '../constants';
import initialState from '../store/initialstate';

export default (currentState, action) => {
  switch (action.type) {
    case Actions.CloseMainMenu:
      return false;
    case Actions.OpenMainMenu:
      return true;
    default:
      return initialState.isMainMenuOpen;
  }
};
