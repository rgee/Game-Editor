import { connect } from 'react-redux';
import Dialogue from './presenter';
import DialogueActions from '../../actions/dialogueActions';

const mapStateToProps = (state, ownProps) => {
  const { params: { dialogueId } } = ownProps;
  const { dialogues } = state;
  const dialogueState = dialogues.state;
  return {
    dialogueId,
    isLoading: dialogueState === 'loading',
    dialogue: dialogues.values[dialogueId] || null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDialogue(id) {
      dispatch(DialogueActions.loadDialogue(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue);
