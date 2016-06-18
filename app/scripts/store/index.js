import {applyMiddleware, createStore} from 'redux';
import initialState from './initialState';
import rootReducer from '../reducers';

const logger = store => next => action => {
  console.log('dispatching', action.type, action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default applyMiddleware(logger)(createStore)(rootReducer,
  initialState);
