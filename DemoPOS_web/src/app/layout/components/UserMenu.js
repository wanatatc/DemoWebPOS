import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  ListItemIcon,
  Icon,
  ListItemText,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import UserProfile from "./UserProfile";
import * as CONST from "../../../Constant";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.secondary.main,
    fontSize: "18px",
  },
  caption: {
    color: theme.palette.text.secondary,
  },
}));

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const authReducer = useSelector(({ auth }) => auth);
  const layoutReducer = useSelector(({ layout }) => layout);
  const classes = useStyles();

  const userProperties = authReducer.userProperties;
  let userName = "";
  let userTextAvatar = "";

  if (
    userProperties.employeeCode !== "" &&
    userProperties.employeeFirstName !== "" &&
    userProperties.employeeLastName !== ""
  ) {
    userName =
      userProperties.employeeCode +
      " " +
      userProperties.employeeFirstName +
      " " +
      userProperties.employeeLastName;
    userTextAvatar =
      userProperties.employeeFirstName.charAt(0) +
      userProperties.employeeLastName.charAt(0);
  } else {
    userName = authReducer.user.userName;
    userTextAvatar = authReducer.user.userName.charAt(0);
  }

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
    <React.Fragment>
      <Button color="secondary">
        {/* Badge notification */}
        <Badge badgeContent={0} color="error">
          <NotificationsIcon />
        </Badge>
      </Button>
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          className={classes.avatar}
          style={{
            marginRight:
              layoutReducer.responsiveKey === "lg" ||
              layoutReducer.responsiveKey === "xl"
                ? 10
                : 0,
          }}
        >
          {userTextAvatar}
        </Avatar>
        {(layoutReducer.responsiveKey === "lg" ||
          layoutReducer.responsiveKey === "xl") && (
          <Typography variant="caption" className={classes.caption}>
            {userName}
          </Typography>
        )}
      </Button>
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
            <UserProfile />
          </div>
        </MenuItem>
        {/* end User Profile */}

        <Divider light />

        {/* start Sign out*/}
        <MenuItem onClick={logoutClick}>
          <ListItemIcon>
            <Icon>logout</Icon>
          </ListItemIcon>
          <ListItemText>ออกจากระบบ</ListItemText>
        </MenuItem>
        {/* end Sign out */}
      </Menu>
    </React.Fragment>
  );
}

export default UserMenu;
