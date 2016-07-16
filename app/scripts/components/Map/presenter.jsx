import React, { PropTypes } from 'react'


const width = 800;
const height = 600;
const speed = 2;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xViewOffset: 0,
      yViewOffset: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.backgroundImageUrl !== this.props.backgroundImageUrl) {
      this.loadBackgroundImage(nextProps.backgroundImageUrl);
    }
  }

  loadBackgroundImage(backgroundImageUrl) {
    const img = new Image();
    img.onload = (() => {
      this.setState({
        backgroundImage: img
      });
    }).bind(this);
    img.src = backgroundImageUrl;
  }

  componentDidMount() {
    this.updateCanvas();
    this.setupEvents();
    this.loadBackgroundImage(this.props.backgroundImageUrl);
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  setupEvents() {
    const { canvas } = this.refs;
    let isDown = false;
    let initialPageX = null;
    let initialPageY = null;
    canvas.addEventListener('mousedown', (e) => {
      isDown = true;
      initialPageX = e.pageX;
      initialPageY = e.pageY;
    });

    canvas.addEventListener('mouseup', () => {
      isDown = false;
    });

    canvas.addEventListener('mousemove', ((e) => {
      if (!isDown) {
        return;
      }

      let xOffset = this.state.xViewOffset;
      let yOffset = this.state.yViewOffset;

      xOffset -= (initialPageX - e.pageX) * speed;
      yOffset -= (initialPageY - e.pageY) * speed;
      initialPageY = yOffset;
      initialPageX = xOffset;

      this.setState({
        xViewOffset: xOffset,
        yViewOffset: yOffset
      });
    }).bind(this));
  }

  updateCanvas() {
    const {
      backgroundImageUrl,
    } = this.props;

    const {
      yViewOffset,
      xViewOffset,
      backgroundImage
    } = this.state;

    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.translate(xViewOffset, yViewOffset);

    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0);
    }
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
  backgroundImageUrl: PropTypes.string,
  xViewOffset: PropTypes.number,
  yViewOffset: PropTypes.number
};

export default Map;
