import React from "react";
import {
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import * as CONST from '../../../Constant';

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const authReducer = useSelector(({ auth }) => auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    window.open(CONST.SSO_CONFIG.authority);
  };

  const logoutClick = () => {
    document.location.href = CONST.AUTH_LOGOUT_REDIRECT;
  };

  return (
    <div>
      <React.Fragment>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Typography variant="caption">{authReducer.user}</Typography>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          {/* start  User Profile*/}
          <MenuItem>
            <div onClick={handleProfile.bind(this)}>
              <UserProfile></UserProfile>
            </div>
          </MenuItem>
          {/* end User Profile */}

          <Divider light />

          {/* start Sign out*/}
          <MenuItem onClick={logoutClick}>
            <Chip
              size="small"
              style={{ marginTop: 10 }}
              // icon={
              //   <Icon style={{ fontSize: 20, marginLeft: 11 }}>logout</Icon>
              // }
              color="default"
            />
            <Link
              style={{ color: "#000000", marginLeft: 20, marginTop: 10 }}
              component="button"
              variant="inherit"
              onClick={() => {
                logoutClick();
              }}
            >
              ออกจากระบบ
            </Link>
          </MenuItem>
          {/* end Sign out */}
        </Menu>
      </React.Fragment>
    </div>
  );
}

export default UserMenu;



