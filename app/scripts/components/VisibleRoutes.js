import { connect } from 'react-redux';
import Routes from './Routes';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.state === 'logged_in',
    isAwaitingAuthDecision: state.auth.state === 'fetching_user'
  };
};

export default connect(mapStateToProps)(Routes);
