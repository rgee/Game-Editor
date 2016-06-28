import { Actions } from '../constants';
import initialState from '../store/initialstate';

export default (currentState, action) => {
  switch (action.type) {
    case Actions.FetchingMaps:
      return {
        state: 'loading',
        values: {}
      };
    case Actions.ReceiveMaps:
      return {
        state: 'loaded',
        values: Object.assign({}, currentState.values, action.maps)
      };
    default:
      return currentState || initialState.maps
  }
};
