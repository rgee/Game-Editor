import { connect } from 'react-redux';
import DialoguesView from './presenter';
import DialogueActions from '../../actions/dialogueActions';
import { values as getValues } from 'lodash';

const mapStateToProps = (currentState) => {
  const { dialogues: { values, state } } = currentState;
  return {
    isLoading: state === 'loading',
    dialogues: getValues(values)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDialogues() {
      dispatch(DialogueActions.load());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesView);
