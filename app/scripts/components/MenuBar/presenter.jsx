import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router';

class MainMenu extends React.Component {
  render() {
    const {
      isMenuOpen,
      avatarUrl,
      onMenuClick,
      onLogoutClick,
      onDrawerChangeRequest,
      onCharactersClick,
      onDialoguesClick,
      onMapsClick,
      router
    } = this.props;

    return (
      <div>
        <AppBar
          title="The Philosopher Queen Editor"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={onMenuClick}
        />
        <Drawer
          open={isMenuOpen}
          docked={false}
          onRequestChange={onDrawerChangeRequest}>

          {avatarUrl ? <Avatar src={avatarUrl} /> : null}
          <MenuItem onTouchTap={() => onCharactersClick(router)}>Characters</MenuItem>
          <MenuItem>Storyboard</MenuItem>
          <MenuItem onTouchTap={() => onMapsClick(router)}>Maps</MenuItem>
          <MenuItem onTouchTap={() => onDialoguesClick(router)}>Dialogue</MenuItem>
          <Divider />
          <MenuItem onTouchTap={onLogoutClick}>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}

MainMenu.propTypes = {
  userDisplayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onDrawerChangeRequest: PropTypes.func.isRequired,
  onCharactersClick: PropTypes.func.isRequired,
  onDialoguesClick: PropTypes.func.isRequired,
  onMapsClick: PropTypes.func.isRequired
};

export default withRouter(MainMenu);
