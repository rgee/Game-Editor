import { Actions } from '../constants';

export default {
  close() {
    return (dispatch, getState) => {
      dispatch({ type: Actions.CloseMainMenu });
    }
  },

  open() {
    return (dispatch, getState) => {
      dispatch({ type: Actions.OpenMainMenu });
    }
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
