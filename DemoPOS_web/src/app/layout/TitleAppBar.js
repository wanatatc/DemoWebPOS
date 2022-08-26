import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { useDispatch, useSelector } from "react-redux";
import * as layoutRedux from "./_redux/layoutRedux";
import {breadcrumbNameMap} from '../routes/BasePage'
import UserMenu from "./components/UserMenu";
import ToggleMenuSwitch from "./components/ToggleMenuSwitch";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TitleAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let location = useLocation();
  const layoutReducer = useSelector(({ layout }) => layout);
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <AppBar
      position="fixed"
      color="default"
      style={{ paddingLeft: layoutReducer.responsiveKey === 'lg' && layoutReducer.toggleMenu ? 240 : 0 }}
    >
      <Toolbar variant="dense">
        {layoutReducer.responsiveKey !== 'lg' && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => {
              dispatch(layoutRedux.actions.updateDrawerOpen(true));
            }}
            color="inherit"
            aria-label="menu"
          >
            <Icon>menu</Icon>
          </IconButton>
        )}
        {(layoutReducer.responsiveKey === 'lg' && !layoutReducer.toggleMenu) && (
          <ToggleMenuSwitch></ToggleMenuSwitch>
        )}
        <Breadcrumbs className={classes.title} aria-label="breadcrumb">
          <RouterLink color="inherit" to="/">
            Home
          </RouterLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            let nameMap = breadcrumbNameMap[to]
            if (!nameMap) {
              nameMap=value
            }
            return last ? (
              <Typography color="textPrimary" key={to}>
                {nameMap}
              </Typography>
            ) : (
              <RouterLink color="inherit" to={to} key={to}>
                 {nameMap}
              </RouterLink>
            );
          })}
        </Breadcrumbs>

        <React.Fragment>
          <UserMenu />
        </React.Fragment>
      </Toolbar>
    </AppBar>
  );
}
