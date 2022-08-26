import React from "react";
import Grid from "@material-ui/core/Grid";
import PropsType from "prop-types";
function CartTableHeader(props) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ marginBottom: 10 }}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        lg={5}
        xs={5}
        md={5}
      >
        Product
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        lg={2}
        xs={2}
        md={2}
      >
        Qty
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        lg={2}
        xs={2}
        md={2}
      >
        Price
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        lg={2}
        xs={2}
        md={2}
      >
        Amount
      </Grid>
      <Grid item lg={1} xs={1} md={1}></Grid>
    </Grid>
  );
}

CartTableHeader.propTypes = {
  showRemoveButton: PropsType.bool,
};

CartTableHeader.defaultProps = {
  showRemoveButton: true,
};

export default CartTableHeader;
