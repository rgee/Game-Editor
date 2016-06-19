import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class MainMenu extends React.Component {
  render() {
    const {
      isMenuOpen,
      avatarUrl,
      onMenuClick,
      onLogoutClick,
      onDrawerChangeRequest
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
          <MenuItem>Characters</MenuItem>
          <MenuItem>Storyboard</MenuItem>
          <MenuItem>Maps</MenuItem>
          <MenuItem>Dialogue</MenuItem>
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
  onDrawerChangeRequest: PropTypes.func.isRequired
};

export default MainMenu;
