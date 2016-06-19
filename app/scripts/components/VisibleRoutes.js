import { connect } from 'react-redux';
import Routes from './Routes';
import CharactersActions from '../actions/charactersActions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.state === 'logged_in',
    isAwaitingAuthDecision: state.auth.state === 'fetching_user'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCharactersOpen() {
      dispatch(CharactersActions.load());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
