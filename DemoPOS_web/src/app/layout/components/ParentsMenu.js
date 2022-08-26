/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";

function ParentsMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const authReducer = useSelector(({ auth }) => auth);
  React.useEffect(() => {
    //set Show menu
    if (props.permissions.length === 0) {
      //allow all permissions
      setShowMenu(true);
    } else {
      // check if route is restricted by role
      let intersection = props.permissions.filter((x) =>
        authReducer.permissions.includes(x)
      );
      if (intersection.length > 0) {
        setShowMenu(true);
      }
    }
  }, [authReducer]);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      {showMenu && (
        <React.Fragment>
          <ListItem button onClick={handleClick}>
            <ListItemIcon style={{ minWidth: "2rem" }}>
              <Icon fontSize="small">{props.iconName}</Icon>
            </ListItemIcon>

            <Tooltip title={props.text} followCursor>
              <ListItemText
                primary={props.text}
                style={{
                  fontSize: "0.75rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                disableTypography
              />
            </Tooltip>
            {open ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container style={{ paddingLeft: 20 }}>
              {props.children}
            </Grid>
          </Collapse>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

ParentsMenu.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  permissions: PropTypes.array,
};

ParentsMenu.defaultProps = {
  iconName: "",
  text: "",
  permissions: [],
};

export default ParentsMenu;
