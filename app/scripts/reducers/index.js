import { combineReducers } from 'redux';
import Auth from './authReducer';
import MainMenu from './mainMenuReducer';
import Characters from './charactersReducer';
import Dialogues from './dialoguesReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: Auth,
  form: formReducer,
  characters: Characters,
  isMainMenuOpen: MainMenu,
  dialogues: Dialogues
});
