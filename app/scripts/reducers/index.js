import { combineReducers } from 'redux';
import Auth from './authReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: Auth,
  form: formReducer
});
