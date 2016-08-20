import React, { PropTypes } from 'react'

const dialogueImageUrls = {
  single: '/images/dialogue-config-single.png',
  double: '/images/dialogue-config-double.png',
  triple: '/images/dialogue-config-triple.png'
}

class DialogueTypeSelector extends React.Component {
  render() {
    return (
      <div className="dialogue-type-selector">
        <div className="dialogue-type">
          <img src={dialogueImageUrls.single} />
        </div>
        <div className="dialogue-type">
          <img src={dialogueImageUrls.double} />
        </div>
        <div className="dialogue-type">
          <img src={dialogueImageUrls.triple} />
        </div>
      </div>
    )
  }
}

export default DialogueTypeSelector;
