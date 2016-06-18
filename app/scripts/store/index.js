import {applyMiddleware, createStore} from 'redux';
import initialState from './initialState';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log('dispatching', action.type, action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default applyMiddleware(thunk, logger)(createStore)(rootReducer,
  initialState);
