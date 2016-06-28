import { connect } from 'react-redux';
import DialoguesView from './presenter';
import DialogueActions from '../../actions/dialogueActions';
import { values as getValues } from 'lodash';

const mapStateToProps = (currentState) => {
  const { dialogues: { values, state } } = currentState;
  return {
    isLoading: state === 'loading',
    isSaving: state === 'saving',
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
      dispatch(DialogueActions.startNewDialogueCreation());
    },

    onDiscardClicked() {
      dispatch(DialogueActions.discardNewDialogue());
    },

    onConfirmClicked(dialogue) {
      dispatch(DialogueActions.create(dialogue));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesView);
