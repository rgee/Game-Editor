import React, { PropTypes } from 'react'


const width = 800;
const height = 600;
class Map extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const {
      backgroundImageUrl
    } = this.props;

    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };

    img.src = backgroundImageUrl;
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

Map.PropTypes = {
  backgroundImageUrl: PropTypes.string
}

export default Map;
