import { connect } from 'react-redux';
import MenuBar from './presenter';
import AuthActions from '../../actions/authActions';
import MainMenuActions from '../../actions/mainMenuActions';

const mapStateToProps = (state) => {
  const { auth: { user } } = state;
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
    },

    onMapsClick(router) {
      if (!router.isActive('/maps')) {
        router.push('/maps')
      }
      dispatch(MainMenuActions.close());
    },

    onCharactersClick(router) {
      if (!router.isActive('/characters')) {
        router.push('/characters')
      }
      dispatch(MainMenuActions.close());
    },

    onDialoguesClick(router) {
      if (!router.isActive('/dialogues')) {
        router.push('/dialogues')
      }
      dispatch(MainMenuActions.close());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
