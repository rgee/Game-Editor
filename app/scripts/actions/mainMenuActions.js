import { Actions } from '../constants';

export default {
  toggle() {
    return (dispatch, getState) => {
      const { isMainMenuOpen } = getState();
      if (isMainMenuOpen) {
        dispatch({ type: Actions.CloseMainMenu });
      } else {
        dispatch({ type: Actions.OpenMainMenu });
      }
    };
  }
};
