import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { breadcrumbNameMap } from "../../routes/BasePage";

const NavigationMap = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      style={{
        flexGrow: 1,
      }}
      aria-label="breadcrumb"
    >
      <Link color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        let nameMap = breadcrumbNameMap[to];
        if (!nameMap) {
          nameMap = value;
        }
        return last ? (
          <Typography color="textPrimary" key={to}>
            {nameMap}
          </Typography>
        ) : (
          <Link color="inherit" to={to} key={to}>
            {nameMap}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavigationMap;
