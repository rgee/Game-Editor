import { connect } from 'react-redux';
import DialoguesView from './presenter';

const mapStateToProps = (currentState) => {
  return {
    dialogues: [
      {
        id: 'test-dialogue',
        displayName: 'Test Dialogue'
      },
      {
        id: 'test-dialogue-2',
        displayName: 'Test Dialogue 2'
      }
    ]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesView);
