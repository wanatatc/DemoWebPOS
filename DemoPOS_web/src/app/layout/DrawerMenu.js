import React from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import * as layoutRedux from "./_redux/layoutRedux";
import ASideMenuList from "./ASideMenuList";

const useStyles = makeStyles({
  list: {
    width: 240,
  },
  fullList: {
    width: "auto",
  },
});

export default function DrawerMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const layoutReducer = useSelector(({ layout }) => layout);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(layoutRedux.actions.updateDrawerOpen(open));
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <ASideMenuList />
    </div>
  );

  return (
    <Drawer
      anchor={"left"}
      open={layoutReducer.drawerOpen}
      onClose={toggleDrawer(false)}
    >
      {list("left")}
    </Drawer>
  );
}
