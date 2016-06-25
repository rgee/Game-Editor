import { connect } from 'react-redux';
import DialoguesView from './presenter';

const mapStateToProps = (currentState) => {
  return {
    dialogues: [
      {
        name: 'test-dialogue',
        id: '238923'
      },
      {
        name: 'test-dialogue-2',
        id: '238923'
      }
    ]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesView);
