import React, { PropTypes } from 'react'
import { DialogueTypes } from '../../constants';
import { values } from 'lodash';

const dialogueImageUrls = {
  single: '/images/dialogue-config-single.png',
  double: '/images/dialogue-config-double.png',
  triple: '/images/dialogue-config-triple.png'
}

class DialogueTypeSelector extends React.Component {
  isSelected(type) {
    return this.props.value === type;
  }

  render() {
    const { onChange } = this.props;
    const selectedClass = (type) => this.isSelected(type) ? 'selected' : '';

    return (
      <div className="dialogue-type-selector">
        <div
          className={`dialogue-type ${selectedClass(DialogueTypes.Single)}`}
          onClick={() => onChange(DialogueTypes.Single)}
        >
          <img src={dialogueImageUrls.single} />
        </div>
        <div
          className={`dialogue-type ${selectedClass(DialogueTypes.Double)}`}
          onClick={() => onChange(DialogueTypes.Double)}
        >
          <img src={dialogueImageUrls.double} />
        </div>
        <div
          className={`dialogue-type ${selectedClass(DialogueTypes.Triple)}`}
          onClick={() => onChange(DialogueTypes.Triple)}
        >
          <img src={dialogueImageUrls.triple} />
        </div>
      </div>
    )
  }
}

DialogueTypeSelector.PropTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(values(DialogueTypes))
};

export default DialogueTypeSelector;
