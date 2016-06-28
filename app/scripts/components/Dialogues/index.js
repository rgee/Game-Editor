import { connect } from 'react-redux';
import DialoguesView from './presenter';
import DialogueActions from '../../actions/dialogueActions';
import { values as getValues } from 'lodash';

const mapStateToProps = (currentState) => {
  const { dialogues: { values, state } } = currentState;
  return {
    isLoading: state === 'loading',
    isCreatingNew: state === 'creating_new',
    dialogues: getValues(values)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDialogues() {
      dispatch(DialogueActions.load());
    },

    onAddClicked() {
      dispatch(DialogueActions.startCreatingNewDialogue());
    },

    onDiscardClicked() {
      dispatch(DialogueActions.discardNewDialogue());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesView);
