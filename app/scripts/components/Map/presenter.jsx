import React, { PropTypes } from 'react'
import { values, find, clamp } from 'lodash';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Modes from './modes';
import CharacterSelector from './CharacterSelector';

const canvasWidth = 1280;
const canvasHeight = 800;
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

  handleGridClick(position) {
    const { mode } = this.props;
    switch (mode) {
      case Modes.Obstructions:
        this.handleObstructionClick(position);
        break;
      case Modes.SpawnPoints:
        this.handleSpawnPointClick(position);
        break;
    }
  }

  handleSpawnPointClick(position) {
    this.props.onSpawnPointAdd(position);
  }

  handleObstructionClick(position) {
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
      this.handleGridClick(position);
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
      obstructions,
      spawnPoints,
      mode
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

    // Grid Lines
    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    for (var i = 0; i < widthInTiles; i++) {
      for (var j = 0; j < heightInTiles; j++) {
        ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }

    switch (mode) {
      case Modes.Obstructions:
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        obstructions.forEach(({ x, y }) => {
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        });
      break;
      case Modes.SpawnPoints:
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        spawnPoints.forEach(({ x, y }) => {
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        });
      break;
    }
  }

  handleModeChange(e, num, payload) {
    this.props.onNewModeSelected(payload);
  }

  handleCharacterSelected(characterId) {
    console.debug('Selected character: ' + characterId);
  }

  renderModeMenu() {
    const { mode } = this.props;
    return (
      <DropDownMenu value={mode} onChange={this.handleModeChange.bind(this)}>
        <MenuItem value={Modes.Obstructions} primaryText="Obstructions" />
        <MenuItem value={Modes.SpawnPoints} primaryText="Spawn Points" />
        <MenuItem value={Modes.Triggers} primaryText="Triggers" />
      </DropDownMenu>
    );
  }

  renderCharacterSelector() {
    const { isCreatingSpawnPoint } = this.props;
    if (!isCreatingSpawnPoint) {
      return null;
    }

    return (
      <CharacterSelector
        onCharacterSelected={this.handleCharacterSelected.bind(this)}
      />
    );
  }

  render() {
    const styles = {
      margin: '0 auto',
      display: 'block'
    };
    return (
      <div>
        {this.renderModeMenu()}
        {this.renderCharacterSelector()}
        <canvas
          ref="canvas"
          style={styles}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    );
  }
}

Map.PropTypes = {
  mode: PropTypes.oneOf(values(Modes)),
  backgroundImageUrl: PropTypes.string,
  widthInTiles: PropTypes.number,
  heightInTiles: PropTypes.number,
  onObstructionAdd: PropTypes.func,
  onObstructionRemove: PropTypes.func,
  onNewModeSelected: PropTypes.func,
  onSpawnPointAdd: PropTypes.func,
  onSpawnPointCance: PropTypes.func,
  onNewSpawnPointConfirmed: PropTypes.func,
  isCreatingSpawnPoint: PropTypes.bool,
  spawnPoints: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number,
      y: Proptypes.number
    }),
    characterId: PropTypes.string
  })),
  obstructions: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }))
};

export default Map;
