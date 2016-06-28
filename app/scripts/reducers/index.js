import { combineReducers } from 'redux';
import Auth from './authReducer';
import MainMenu from './mainMenuReducer';
import Characters from './charactersReducer';
import Maps from './mapsReducer';
import Dialogues from './dialogueReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: Auth,
  form: formReducer,
  characters: Characters,
  isMainMenuOpen: MainMenu,
  dialogues: Dialogues,
  maps: Maps
});
