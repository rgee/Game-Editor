import { Actions } from '../constants';

export default {
  close() {
    return (dispatch) => {
      dispatch({ type: Actions.CloseMainMenu });
    };
  },

  open() {
    return (dispatch) => {
      dispatch({ type: Actions.OpenMainMenu });
    };
  },

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
