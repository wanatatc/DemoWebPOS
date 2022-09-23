import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Divider,
  Grid,
  Icon,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import * as layoutRedux from "./_redux/layoutRedux";
import UserMenu from "./components/UserMenu";
import NavigationMap from "./components/NavigationMap";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function HideOnScroll(props) {
  const { children, windows } = props;
  const trigger = useScrollTrigger({ target: windows ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <div style={{display: trigger ? "none" : "block"}}>
        {children}
      </div>
    </Slide>
  );
}

export default function TitleAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const layoutReducer = useSelector(({ layout }) => layout);

  const handleDrawerToggle = () => {
    if (
      layoutReducer.responsiveKey === "lg" ||
      layoutReducer.responsiveKey === "xl"
    ) {
      dispatch(layoutRedux.actions.updateToggleMenu(!layoutReducer.toggleMenu));
    } else {
      dispatch(layoutRedux.actions.updateDrawerOpen(true));
    }
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      style={{
        paddingLeft:
          layoutReducer.responsiveKey === "lg" && layoutReducer.toggleMenu
            ? 240
            : 0,
      }}
    >
      <Toolbar variant="dense" style={{ backgroundColor: theme.palette.background.paper }}>
        <Grid container>
          <Grid container xs={7} sm={5} alignItems="center" wrap="nowrap">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleDrawerToggle}
              color="inherit"
              aria-label="menu"
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography color="primary" style={{fontWeight: 600, textOverflow: "ellipsis",whiteSpace: "nowrap", overflow: "hidden", fontSize: "1.2rem"}}>{layoutReducer.currentTitle}</Typography>
          </Grid>
          <Grid container xs={5} sm={7} justifyContent="flex-end">
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
      <HideOnScroll>
          <Divider light />
          <Toolbar variant="dense" style={{ backgroundColor: theme.palette.background.paper }}>
            <NavigationMap />
          </Toolbar>
      </HideOnScroll>
    </AppBar>
  );
}
