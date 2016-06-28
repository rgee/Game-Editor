import { Actions } from '../constants';
import firebase from '../firebase';

export default {
  load() {
    return (dispatch) => {
      dispatch({ type: Actions.FetchingMaps });
      firebase.database().ref('maps').orderByChild('createdOn').once('value').then((maps) => {
        dispatch({
          type: Actions.ReceiveMaps,
          maps: maps.val() || {}
        });
      });
    };
  },

  create(map) {
    throw new Error('no');
  },

  discardNewMap() {
    return {
      type: Actions.DiscardNewMap
    };
  },

  startNewMapCreation() {
    return {
      type: Actions.StartCreatingNewMap
    };
  }
}
