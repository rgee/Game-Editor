import React, { PropTypes } from 'react'
import { keys, groupBy, values, find, clamp } from 'lodash';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Modes from './modes';
import CharacterSelector from './CharacterSelector';
import TriggerEditor from './TriggerEditor';
import TurnEventEditor from './TurnEventEditor';
import IconButton from 'material-ui/IconButton';
import Plus from 'material-ui/svg-icons/content/add-box';


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
      case Modes.Triggers:
        this.handleTriggerTileClick(position);
        break;
    }
  }

  handleTriggerTileClick(position) {
    const { triggerTiles } = this.props;
    const matchingTile = find(triggerTiles, { position });
    if (matchingTile) {
      this.props.onTriggerTileEditStart(matchingTile.id);
    } else {
      this.props.onTriggerTileAdd(position);
    }
  }

  handleSpawnPointClick(position) {
    const { spawnPoints } = this.props;
    const matchingSpawnPoint = find(spawnPoints, { position });
    if (matchingSpawnPoint) {
      this.props.onSpawnPointRemove(matchingSpawnPoint.id);
    } else {
      this.props.onSpawnPointAdd(position);
    }
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
      triggerTiles,
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
        spawnPoints.forEach((spawnPoint) => {
          const { position: { x, y } } = spawnPoint;
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        });
      break;
      case Modes.Triggers:
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        triggerTiles.forEach((trigger) => {
          const { position: { x, y } } = trigger;
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        });
      break;
    }
  }

  handleModeChange(e, num, payload) {
    this.props.onNewModeSelected(payload);
  }

  handleCharacterSelected(characterId) {
    this.props.onNewSpawnPointConfirmed(characterId);
  }

  handleTriggerEditSave(trigger) {
    this.props.onTriggerTileEditSave(this.props.editingTriggerTileId, trigger);
  }

  handleTriggerDelete() {
    this.props.onTriggerDelete(this.props.editingTriggerTileId);
  }

  renderTopMenu() {
    const { mode } = this.props;
    const styles = {
      marginBottom: 15
    };

    return (
      <div style={styles}>
        <DropDownMenu value={mode} onChange={this.handleModeChange.bind(this)}>
          <MenuItem value={Modes.Obstructions} primaryText="Obstructions" />
          <MenuItem value={Modes.SpawnPoints} primaryText="Spawn Points" />
          <MenuItem value={Modes.Triggers} primaryText="Triggers" />
        </DropDownMenu>
      </div>
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
        onDiscard={this.props.onSpawnPointCancel}
      />
    );
  }

  renderTriggerEditor() {
    const {
      onTriggerTileSave,
      editingTriggerTileId,
      isCreatingTriggerTile,
      isEditingTriggerTile,
      onTriggerTileCancel,
      onTriggerEditCancel
    } = this.props;

    if (!(isEditingTriggerTile || isCreatingTriggerTile)) {
      return null;
    }

    if (isEditingTriggerTile) {
      const initialValues = find(this.props.triggerTiles, { id: editingTriggerTileId });
      return (
        <TriggerEditor
          onSubmit={this.handleTriggerEditSave.bind(this)}
          onCancel={onTriggerEditCancel}
          onDiscard={this.handleTriggerDelete.bind(this)}
          editing={true}
          initialValues={initialValues}
        />
      );
    }

    return (
      <TriggerEditor
        onSubmit={onTriggerTileSave}
        onCancel={onTriggerTileCancel}
        editing={false}
      />
    );
  }

  renderTurnEventEditor() {
    const {
      isEditingTurnEvent,
      isCreatingTurnEvent,
      editingTurnEventId,
      onTurnEventCancel,
      onTurnEventEditCancel,
      onTurnEventSave
    } = this.props;

    if (!(isEditingTurnEvent || isCreatingTurnEvent)) {
      return null;
    }

    if (isEditingTurnEvent) {
      const initialValues = find(this.props.turnEvents, {
        id: editingTurnEventId
      });
      return (
        <TurnEventEditor
          onSubmit={this.handleTurnEventSave.bind(this)}
          onCancel={onTurnEventEditCancel}
          onDiscard={this.handleTurnEventDelete.bind(this)}
          editing={true}
          initialValues={initialValues}
        />
      )
    }

    return (
      <TurnEventEditor
        onSubmit={onTurnEventSave}
        onCancel={onTurnEventCancel}
        editing={false}
      />
    );
  }

  renderTurnEvents() {
    const { turnEvents, onTurnEventAdd } = this.props;
    const eventsByTurn = groupBy(turnEvents, 'turn');
    const turnKeys = keys(eventsByTurn);
    turnKeys.sort();

    const eventStyles = {
      marginBottom: 10
    };

    const events = turnKeys.map((turn) => {
      const eventsOnThisTurn = eventsByTurn[turn];
      const labelStyles = {
        marginRight: 10
      };

      const buttonStyles = {
        marginRight: 10
      };
      return (
        <div style={eventStyles} key={`turn-${turn}`}>
          <strong style={labelStyles}>{`Turn ${turn}:`}</strong>
          {eventsOnThisTurn.map((event, index) => {
            return (
              <RaisedButton
                key={index}
                label={event.eventName}
                style={buttonStyles}
              />
            )
          })}
        </div>
      );
    });

    const iconButtonStyles = {
      verticalAlign: 'middle'
    };

    return (
      <div>
        <h2>
          Turn Events
          <IconButton
            style={iconButtonStyles}
            onTouchTap={onTurnEventAdd}
          >
            <Plus />
          </IconButton>
        </h2>
        <div>
          {events}
        </div>
      </div>
    )
  }

  render() {
    const styles = {
      display: 'block'
    };
    return (
      <div>
        {this.renderTopMenu()}
        {this.renderCharacterSelector()}
        {this.renderTriggerEditor()}
        {this.renderTurnEventEditor()}
        <canvas
          ref="canvas"
          style={styles}
          width={canvasWidth}
          height={canvasHeight}
        />
        {this.renderTurnEvents()}
      </div>
    );
  }
}

const PositionPropType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number
});

Map.PropTypes = {
  mode: PropTypes.oneOf(values(Modes)),
  backgroundImageUrl: PropTypes.string,
  widthInTiles: PropTypes.number,
  heightInTiles: PropTypes.number,
  onObstructionAdd: PropTypes.func,
  onObstructionRemove: PropTypes.func,
  onNewModeSelected: PropTypes.func,

  onSpawnPointAdd: PropTypes.func,
  onSpawnPointRemove: PropTypes.func,
  onSpawnPointCancel: PropTypes.func,
  onNewSpawnPointConfirmed: PropTypes.func,
  isCreatingSpawnPoint: PropTypes.bool,

  onTriggerTileAdd: PropTypes.func,
  onTriggerTileCancel: PropTypes.func,
  onTriggerTileEditCancel: PropTypes.func,
  onTriggerTileEditStart: PropTypes.func,
  onTriggerTileEditSave: PropTypes.func,
  onTriggerDelete: PropTypes.func,
  isCreatingTriggerTile: PropTypes.bool,
  isEditingTriggerTile: PropTypes.bool,

  isEditingTurnEvent: PropTypes.bool,
  isCreatingTurnEvent: PropTypes.bool,
  editingTurnEventId: PropTypes.string,
  onTurnEventAdd: PropTypes.func,
  onTurnEventCancel: PropTypes.func,
  onTurnEventEditCancel: PropTypes.func,
  onTurnEventEditStart: PropTypes.func,
  onTurnEventSave: PropTypes.func,

  turnEvents: PropTypes.arrayOf(PropTypes.shape({
    turn: PropTypes.number,
    eventName: PropTypes.string
  })),

  triggerTiles: PropTypes.arrayOf(PropTypes.shape({
    position: PositionPropType,
    eventName: PropTypes.string,
    description: PropTypes.string
  })),

  spawnPoints: PropTypes.arrayOf(PropTypes.shape({
    position: PositionPropType,
    characterId: PropTypes.string
  })),

  obstructions: PropTypes.arrayOf(PositionPropType)
};

export default Map;
