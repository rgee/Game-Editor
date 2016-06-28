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
    case Actions.StartCreatingNewMap:
      return {
        state: 'creating_new',
        values: currentState.values
      };
    case Actions.DiscardNewMap:
      return {
        state: 'loaded',
        values: currentState.values
      };
    case Actions.SavingNewMap:
      return {
        state: 'saving',
        values: currentState.values
      };
    case Actions.NewMapSaved:
      return {
        state: 'loaded',
        values: Object.assign({}, currentState.values, {
          [action.map.id]: action.map
        })
      };
    default:
      return currentState || initialState.maps
  }
};
