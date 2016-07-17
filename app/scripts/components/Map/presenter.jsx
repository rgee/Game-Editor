import React, { PropTypes } from 'react'
import { find, clamp } from 'lodash';

const canvasWidth = 800;
const canvasHeight = 600;
const speed = 2;
const tileSize = 32;

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
    let dragging = false;
    canvas.addEventListener('mousedown', (e) => {
      isDown = true;
      initialPageX = e.pageX;
      initialPageY = e.pageY;
    });

    canvas.addEventListener('click', ((e) => {
      if (dragging) {
        dragging = false;
        return;
      }

      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect()
      const canvasX = (e.clientX - rect.left) - this.state.xViewOffset;
      const canvasY = (e.clientY - rect.top) - this.state.yViewOffset;
      const position = {
        x: Math.floor(canvasX / tileSize),
        y: Math.floor (canvasY / tileSize)
      };

      const {
        onObstructionAdd,
        onObstructionRemove,
        obstructions
      } = this.props;

      const matchingObstruction = find(obstructions, position);
      if (matchingObstruction) {
        onObstructionRemove(matchingObstruction.id);
      } else {
        onObstructionAdd(position);
      }
    }).bind(this));

    canvas.addEventListener('mouseup', () => {
      isDown = false;
    });

    canvas.addEventListener('mouseout', () => {
      isDown = false;
    });

    canvas.addEventListener('mousemove', ((e) => {
      const bgImage = this.state.backgroundImage;

      // Don't do anything on raw mousemoves, or if there's
      // no background image to clamp to.
      if (!isDown || !bgImage) {
        return;
      }

      dragging = true;

      const canvas = this.refs.canvas;
      const maxWidth = bgImage ? bgImage.width : Number.MAX_VALUE;
      const maxHeight = bgImage ? bgImage.height : Number.MAX_VALUE;

      let xOffset = this.state.xViewOffset;
      let yOffset = this.state.yViewOffset;

      xOffset -= (initialPageX - e.pageX) * speed;
      yOffset -= (initialPageY - e.pageY) * speed;
      initialPageY = e.pageY;
      initialPageX = e.pageX;

      xOffset = clamp(xOffset, canvas.width - maxWidth, 0);
      yOffset = clamp(yOffset, canvas.height - maxHeight, 0);

      this.setState({
        xViewOffset: xOffset,
        yViewOffset: yOffset
      });
    }).bind(this));
  }

  updateCanvas() {
    const {
      backgroundImageUrl,
      widthInTiles,
      heightInTiles,
      obstructions
    } = this.props;

    const {
      yViewOffset,
      xViewOffset,
      backgroundImage
    } = this.state;

    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.translate(xViewOffset, yViewOffset);

    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0);
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    for (var i = 0; i < widthInTiles; i++) {
      for (var j = 0; j < heightInTiles; j++) {
        ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }

    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    obstructions.forEach(({ x, y }) => {
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />
      </div>
    );
  }
}

Map.PropTypes = {
  backgroundImageUrl: PropTypes.string,
  widthInTiles: PropTypes.number,
  heightInTiles: PropTypes.number,
  onObstructionAdd: PropTypes.func,
  onObstructionRemove: PropTypes.func,
  obstructions: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }))
};

export default Map;
