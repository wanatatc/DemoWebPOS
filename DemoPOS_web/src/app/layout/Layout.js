import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import * as layoutRedux from "./_redux/layoutRedux";
import ASideMenuList from "./ASideMenuList";
import TitleAppBar from "./TitleAppBar";
import ResKeyUpdator from "./components/ResKeyUpdator";


const drawerWidth = 245;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  scrollTopRoot: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  list: {
    width: 240,
  },
  fullList: {
    width: "auto",
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollTopRoot}
      >
        {children}
      </div>
    </Zoom>
  );
}

function Layout(props) {
  const classes = useStyles();
  const layoutReducer = useSelector(({ layout }) => layout);
  const dispatch = useDispatch();
  const theme = createTheme({
    typography: {
      fontFamily: ["Sarabun", "sans-serif"].join(","),
    },
  });

  const handleDrawerToggle = () => {
    dispatch(layoutRedux.actions.updateDrawerOpen(!layoutReducer.drawerOpen));
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <ASideMenuList></ASideMenuList>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <ResKeyUpdator></ResKeyUpdator>
        <TitleAppBar></TitleAppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* xs sm md */}
          {layoutReducer.responsiveKey !== 'lg' && (
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={layoutReducer.drawerOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list("left")}
            </Drawer>
           )} 

          {/* Lg */}
          {layoutReducer.responsiveKey === 'lg' && layoutReducer.toggleMenu && (
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {list("left")}
            </Drawer>
           )} 
        </nav>

        <div
          style={{
            flexGrow: 1,
            paddingTop: 15,
            paddingBottom: 10,
            paddingRight: 10,
            paddingLeft: (layoutReducer.responsiveKey === 'lg' && layoutReducer.toggleMenu)? 250 : 15,
            width: '100%'
          }}
        >
          <Toolbar variant="dense" id="back-to-top-anchor" />
          {props.children}
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
