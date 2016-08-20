import React, { PropTypes } from 'react'

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
        <div className={`dialogue-type ${selectedClass('single')}`} onClick={() => onChange('single')}>
          <img src={dialogueImageUrls.single} />
        </div>
        <div className={`dialogue-type ${selectedClass('double')}`} onClick={() => onChange('double')}>
          <img src={dialogueImageUrls.double} />
        </div>
        <div className={`dialogue-type ${selectedClass('triple')}`} onClick={() => onChange('triple')}>
          <img src={dialogueImageUrls.triple} />
        </div>
      </div>
    )
  }
}

DialogueTypeSelector.PropTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(['single', 'double', 'triple'])
};

export default DialogueTypeSelector;
