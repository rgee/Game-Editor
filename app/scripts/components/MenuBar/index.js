import { connect } from 'react-redux';
import MenuBar from './presenter';
import AuthActions from '../../actions/authActions';
import MainMenuActions from '../../actions/mainMenuActions'

const mapStateToProps = (state) => {
  const { auth: { user }} = state;
  return {
    isMenuOpen: state.isMainMenuOpen,
    avatarUrl: user ? user.photoURL : null,
    userDisplayName: user ? (user.displayName || user.email) : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick() {
      dispatch(AuthActions.logout());
    },

    onMenuClick() {
      dispatch(MainMenuActions.toggle());
    },

    onDrawerChangeRequest(open) {
      if (open) {
        dispatch(MainMenuActions.open());
      } else {
        dispatch(MainMenuActions.close());
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
