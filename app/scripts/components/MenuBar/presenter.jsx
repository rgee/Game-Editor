import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

class MainMenu extends React.Component {
  render () {
    const {
      isMenuOpen,
      avatarUrl,
      userDisplayName,
      onMenuClick,
      onLogoutClick
    } = this.props;

    return (
      <div>
        <AppBar
          title="The Philosopher Queen Editor"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={onMenuClick}
        />
        <Drawer open={isMenuOpen}>
          <MenuItem>
            <Avatar src={avatarUrl} />
          </MenuItem>
          <MenuItem onTouchTap={onLogoutClick}>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}

MainMenu.propTypes = {
  userDisplayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default MainMenu;
