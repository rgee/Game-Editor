import { connect } from 'react-redux';
import Routes from './Routes';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.state === 'logged_in',
    isAwaitingAuthDecision: state.auth.state === 'fetchingUser'
  }
};

export default connect(mapStateToProps)(Routes);
