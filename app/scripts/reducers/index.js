import { combineReducers } from 'redux';
import Auth from './authReducer';

export default combineReducers({
  auth: Auth
});
