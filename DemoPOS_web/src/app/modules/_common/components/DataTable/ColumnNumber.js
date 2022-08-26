/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from "react";
import { Grid } from "@material-ui/core";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

function ColumnNumber(props) {

  return (
      <Grid
        style={{ padding: 0, margin: 0 }}
        container
        direction="row"
        justifyContent={props.alignRight? "flex-end":"flex-start"}
        alignItems="center"
      >
        <NumberFormat {...props} value={props.value} thousandSeparator={true}  displayType="text" />
      </Grid>
  );
}

ColumnNumber.propTypes = {
  value: PropTypes.number,
  alignRight: PropTypes.bool
};

ColumnNumber.defaultProps = {
  value: null,
  alignRight: true
};


export default ColumnNumber;
