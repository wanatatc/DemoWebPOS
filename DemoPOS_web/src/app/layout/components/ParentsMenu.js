/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Collapse,
  Grid,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function ParentsMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const authReducer = useSelector(({ auth }) => auth);
  const theme = useTheme();

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
          <ListItem
            button
            onClick={handleClick}
            style={{
              padding: "0.75rem",
            }}
          >
            <ListItemIcon
              style={{
                minWidth: "2rem",
                color: theme.palette.secondary.contrastText,
              }}
            >
              <Icon fontSize="small">{props.iconName}</Icon>
            </ListItemIcon>

            <Tooltip title={props.text} followCursor>
              <ListItemText
                primary={props.text}
                style={{
                  fontSize: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: theme.palette.secondary.contrastText,
                }}
                disableTypography
              />
            </Tooltip>
            {open ? (
              <ExpandLess
                fontSize="small"
                style={{ color: theme.palette.secondary.contrastText }}
              />
            ) : (
              <ExpandMore
                fontSize="small"
                style={{ color: theme.palette.secondary.contrastText }}
              />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container className="MuiListItem-Collapse-Container">
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
