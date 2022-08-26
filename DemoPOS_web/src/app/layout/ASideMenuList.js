import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import MenuItem from "./components/MenuItem";
import ParentsMenu from "./components/ParentsMenu";
import * as CONST from "../../Constant";
import { PERMISSIONS } from "../../Constant";
import {  useSelector } from "react-redux";
import ToggleMenuSwitch from "./components/ToggleMenuSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ASideMenuList() {
  const classes = useStyles();
  const layoutReducer = useSelector(({ layout }) => layout);

  return (
    <List
      dense
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ height: 42 }}
          >
            {CONST.APP_INFO.name} - <small>{CONST.APP_INFO.version}</small>
          </ListSubheader>
        </Grid>
        <Grid item>
          {layoutReducer.responsiveKey === "lg" && (
            <ToggleMenuSwitch></ToggleMenuSwitch>
          )}
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: 15 }} />

      <MenuItem iconName="home" text="Home" path="/home"></MenuItem>

      <MenuItem iconName="quiz" text="Test" path="/test"></MenuItem>

      <MenuItem
        iconName="face_retouching_natural"
        text="Manage employee"
        path="/employeeManage"
        permissions={[PERMISSIONS.employee_read]}
      ></MenuItem>

      <ParentsMenu iconName="admin_panel_settings" text="Admin">
        <MenuItem iconName="star" text="Title" path="/title"></MenuItem>
      </ParentsMenu>

      <ParentsMenu
        iconName="admin_panel_settings"
        text="Test Permission"
        permissions={[PERMISSIONS.employee_delete]}
      >
        <MenuItem
          iconName="star"
          text="Title"
          path="/permissionTest"
          permissions={[PERMISSIONS.employee_delete]}
        ></MenuItem>
      </ParentsMenu>

      {/* Demo */}
      <ParentsMenu iconName="star" text="Demo">
        <MenuItem iconName="star" text="Alert" path="/demo/alert"></MenuItem>
        <MenuItem
          iconName="integration_instructions"
          text="Form Components"
          path="/demo/formDemo"
        ></MenuItem>
        <MenuItem
          iconName="view_list"
          text="Data Table"
          path="/demo/datatableList"
        ></MenuItem>
        <MenuItem
          iconName="storage"
          text="Redux Basic"
          path="/demo/reduxDemo"
        ></MenuItem>
        <MenuItem
          iconName="tab"
          text="Tab Basic"
          path="/demo/tabBasic"
        ></MenuItem>
        {/* Start QR - BarCode */}
        <ParentsMenu iconName="qr_code" text="QR-BarCode">
          <MenuItem
            iconName="horizontal_split"
            text="Barcode Generate"
            path="/demo/BarcodeGenerateDemo"
          ></MenuItem>
          <MenuItem
            iconName="qr_code_2"
            text="QR Generate"
            path="/demo/QRGenerateDemo"
          ></MenuItem>
          <MenuItem
            iconName="qr_code_scanner"
            text="QR Reader"
            path="/demo/QRReaderDemo"
          ></MenuItem>
        </ParentsMenu>
        <MenuItem
          iconName="star"
          text="Time-Ago"
          path="/demo/timeAgoPage"
        ></MenuItem>
        {/* End QR - Barcode */}

        {/* Start Reporting */}
        <ParentsMenu iconName="summarize" text="Reporting">
          <MenuItem
            iconName="picture_as_pdf"
            text="Pdf Generate"
            path="/demo/pdfGenerrate"
          ></MenuItem>
          <MenuItem
            iconName="assessment"
            text="Chart Basic"
            path="/demo/apexcharts"
          ></MenuItem>
          <MenuItem
            iconName="add_chart"
            text="Chart DrillDown"
            path="/demo/chartDrillDown"
          ></MenuItem>
          <MenuItem
            iconName="local_printshop"
            text="Print Component"
            path="/demo/PrintComponent"
          ></MenuItem>
        </ParentsMenu>
        {/* End Reporting */}
        <MenuItem
          iconName="calendar_month"
          text="Calendar"
          path="/demo/calendar"
        ></MenuItem>
      </ParentsMenu>
      {/* End Demo */}
      <MenuItem iconName="tab" text="Product" path="/product"></MenuItem>
      <MenuItem
        iconName="tab"
        text="Product Group"
        path="/productgroup"
      ></MenuItem>
      <MenuItem iconName="tab" text="Purchase" path="/purchase"></MenuItem>
    </List>
  );
}
