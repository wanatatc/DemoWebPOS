import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CssBaseline,
  Drawer,
  Fab,
  ThemeProvider,
  Toolbar,
  Zoom,
  useScrollTrigger,
} from "@material-ui/core";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import * as layoutRedux from "./_redux/layoutRedux";
import ASideMenuList from "./ASideMenuList";
import ResKeyUpdator from "./components/ResKeyUpdator";
import TitleAppBar from "./TitleAppBar";

const drawerWidth = 245;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    backgroundColor: palette.secondary.main,
    overflowX: "hidden",
    width: drawerWidth,
  },
  scrollTopRoot: {
    bottom: theme.spacing(2),
    position: "fixed",
    right: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingRight: 10,
    paddingTop: 65,
    width: "100%",
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

export const themeStyles = ["submit", "unapprove", "edit"];

export const useContainedStyles = makeStyles((theme) => ({
  edit: theme.custom.buttonContained.edit,
  submit: theme.custom.buttonContained.submit,
  unapprove: theme.custom.buttonContained.unapprove,
}));

export const useOutlinedStyles = makeStyles((theme) => ({
  edit: theme.custom.buttonOutlined.edit,
  submit: theme.custom.buttonOutlined.submit,
  unapprove: theme.custom.buttonOutlined.unapprove,
}));

export const useTextStyles = makeStyles((theme) => ({
  edit: theme.custom.buttonText.edit,
  submit: theme.custom.buttonText.submit,
  unapprove: theme.custom.buttonText.unapprove,
}));

export const palette = {
  common: {
    black: "#212121",
    white: "#e2f1f8",
  },
  primary: {
    main: "#007ac1",
    light: "#67daff",
    dark: "#03A9F4",
    contrastText: "#fff",
  },
  secondary: {
    main: "#01579b",
    light: "#4f83cc",
    dark: "#002f6c",
    contrastText: "#fff",
  },
  submit: {
    main: "#388e3c",
    light: "#6abf69",
    dark: "#00600f",
    contrastText: "#fff",
    borderMain: "1px solid #388E3C",
    borderLight: "1px solid #6ABF69",
    borderDark: "1px solid #00600F",
    backgroundAlpha: "#388E3C11",
  },
  success: {
    main: "#388e3c",
    light: "#6abf69",
    dark: "#00600f",
    contrastText: "#fff",
  },
  unapprove: {
    main: "#bf360c",
    light: "#f9683a",
    dark: "#870000",
    contrastText: "#fff",
    borderMain: "1px solid #BF360C",
    borderLight: "1px solid #F9683A",
    borderDark: "1px solid #870000",
    backgroundAlpha: "#BF360C11",
  },
  error: {
    main: "#bf360c",
    light: "#f9683a",
    dark: "#870000",
    contrastText: "#fff",
  },
  edit: {
    main: "#fbc02d",
    light: "#fff263",
    dark: "#c49000",
    contrastText: "#000",
    borderMain: "1px solid #FBC02D",
    borderLight: "1px solid #FFF263",
    borderDark: "1px solid #C49000",
    backgroundAlpha: "#FBC02D11",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#A6A6A6",
    hint: "#e0e0e0",
  },
  background: {
    default: "#F5F5F7",
    paper: "#fff",
  },
};

function Layout(props) {
  const layoutReducer = useSelector(({ layout }) => layout);
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = createTheme({
    typography: {
      fontFamily: ["Sarabun", "sans-serif"].join(","),
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          ".sweetAlert-confirm": {
            marginLeft: "1rem",
            background: palette.submit.main,
            color: palette.submit.contrastText,
            "&:hover": {
              background: palette.submit.light,
            },
          },
          ".sweetAlert-cancel": {
            background: "unset",
            color: palette.unapprove.main,
            border: palette.unapprove.borderMain,
            "&:hover": {
              background: palette.unapprove.backgroundAlpha,
              border: palette.unapprove.borderLight,
            },
          },
          ".MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover":
            {
              backgroundColor: palette.primary.main + " !important",
              color: palette.primary.contrastText + " !important",
            },
          ".MuiListItem-Collapse-Container .MuiListItem-root": {
            paddingLeft: "1.45rem !important",
          },
          ".MuiListItem-Collapse-Container .MuiListItem-Collapse-Container .MuiListItem-root":
            {
              paddingLeft: "2.05rem !important",
            },
          ".MuiDrawer-paper::-webkit-scrollbar": {
            background: palette.secondary.main,
            width: "8px",
          },
          ".MuiDrawer-paper::-webkit-scrollbar-thumb": {
            background: "#FFFFFF55",
            borderRadius: "20px",
          },
          ".MuiDropzoneArea-root" : {
            minHeight: "auto !important",
            border: "none !important",
            background: "none !important",
          },
          ".MuiDropzoneArea-textContainer" : {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row-reverse',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '8px',
            background: '#FFF',
            marginBottom: '8px'
          },
          ".MuiDropzoneArea-text" : {
            marginLeft: '8px',
            fontSize: '1rem',
          },
          ".MuiDropzoneArea-icon" : {
            width: '32px !important',
            height: '32px !important',
          },
          "input[type='text'].MuiInputBase-input" : {
            lineHeight: '2em !important',
          },
        },
      },
    },
    palette: palette,
    custom: {
      buttonContained: {
        submit: {
          background: palette.submit.main,
          color: palette.submit.contrastText,
          "&:hover": {
            background: palette.submit.light,
          },
          "& .MuiChip-icon": {
            color: palette.submit.contrastText,
          },
        },
        unapprove: {
          background: palette.unapprove.main,
          color: palette.unapprove.contrastText,
          "&:hover": {
            background: palette.unapprove.light,
          },
          "& .MuiChip-icon": {
            color: palette.unapprove.contrastText,
          },
        },
        edit: {
          background: palette.edit.main,
          color: palette.edit.contrastText,
          "&:hover": {
            background: palette.edit.light,
          },
          "& .MuiChip-icon": {
            color: palette.edit.contrastText,
          },
        },
      },

      buttonOutlined: {
        submit: {
          background: "unset",
          color: palette.submit.main,
          border: palette.submit.borderMain,
          "&:hover": {
            background: palette.submit.backgroundAlpha,
            border: palette.submit.borderLight,
          },
          "& .MuiChip-icon": {
            color: palette.submit.main,
          },
        },
        unapprove: {
          background: "unset",
          color: palette.unapprove.main,
          border: palette.unapprove.borderMain,
          "&:hover": {
            background: palette.unapprove.backgroundAlpha,
            border: palette.unapprove.borderLight,
          },
          "& .MuiChip-icon": {
            color: palette.unapprove.main,
          },
        },
        edit: {
          background: "unset",
          color: palette.edit.main,
          border: palette.edit.borderMain,
          "&:hover": {
            background: palette.edit.backgroundAlpha,
            border: palette.edit.borderLight,
          },
          "& .MuiChip-icon": {
            color: palette.edit.main,
          },
        },
      },

      buttonText: {
        submit: {
          color: palette.submit.main,
          "&:hover": {
            background: palette.submit.backgroundAlpha,
          },
        },
        unapprove: {
          color: palette.unapprove.main,
          "&:hover": {
            background: palette.unapprove.backgroundAlpha,
          },
        },
        edit: {
          color: palette.edit.main,
          "&:hover": {
            background: palette.edit.backgroundAlpha,
          },
        },
      },
    },
  });

  const handleDrawerToggle = () => {
    dispatch(layoutRedux.actions.updateDrawerOpen(!layoutReducer.drawerOpen));
  };

  let drawerProps = {
    classes:{
      paper: classes.drawerPaper,
    },
  };

  if(layoutReducer.responsiveKey === "lg" || layoutReducer.responsiveKey === "xl"){
    drawerProps["variant"] = "permanent";
    drawerProps["open"] = true;
  }else{
    drawerProps["variant"] = "temporary";
    drawerProps["open"] = layoutReducer.drawerOpen;
    drawerProps["onClose"]= handleDrawerToggle;
    drawerProps["anchor"]= theme.direction === "rtl" ? "right" : "left";
    drawerProps["ModalProps"]={
      keepMounted: true, // Better open performance on mobile.
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <ResKeyUpdator />
        <TitleAppBar />
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              {...drawerProps} style={{display:layoutReducer.toggleMenu ? "block": "none"}}
            >
              <div role="presentation">
                <ASideMenuList />
              </div>
            </Drawer>
        </nav>

        <div
          className={classes.content}
          style={{
            paddingLeft:
              layoutReducer.responsiveKey === "lg" && layoutReducer.toggleMenu
                ? 265
                : 15,
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
