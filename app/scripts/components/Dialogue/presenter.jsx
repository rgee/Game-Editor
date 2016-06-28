import React, { PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  progress: {
    margin: '0 auto'
  }
};

class Dialogue extends React.Component {
  componentDidMount() {
    const { dialogue, dialogueId, fetchDialogue } = this.props;
    if (!dialogue) {
      fetchDialogue(dialogueId);
    }
  }

  renderContent() {
    const { isLoading, dialogue } = this.props;
    if (isLoading || !dialogue) {
      return <CircularProgress size={2} style={styles.progress} />;
    }

    return (
      <div>
        <h2>{dialogue.displayName}</h2>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Dialogue.PropTypes = {
  dialogue: PropTypes.object,
  dialogueId: PropTypes.string,
  isLoading: PropTypes.bool,
  fetchDialogue: PropTypes.func
};

export default Dialogue;
