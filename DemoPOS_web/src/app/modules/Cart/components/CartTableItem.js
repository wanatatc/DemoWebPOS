import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";

import * as cartRedux from "../cartRedux";

function CartTableItem(props) {
  const dispatch = useDispatch();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item lg={5} xs={5} md={5}>
        <Typography variant="body2">{props.productName}</Typography>
      </Grid>
      <Grid item container   direction="row"
  justifyContent="flex-end"
  alignItems="flex-start" lg={2} xs={2} md={2}>
        <NumberFormat
          thousandSeparator={true}
          value={props.quantity}
          displayType={"text"}
        ></NumberFormat>
      </Grid>
      <Grid item container   direction="row"
  justifyContent="flex-end"
  alignItems="flex-start" lg={2} xs={2} md={2}>
        <NumberFormat
          thousandSeparator={true}
          value={props.price}
          displayType={"text"}
        ></NumberFormat>
      </Grid>
      <Grid item container   direction="row"
  justifyContent="flex-end"
  alignItems="flex-start" lg={2} xs={2} md={2}>
        <NumberFormat
          thousandSeparator={true}
          value={props.amount}
          displayType={"text"}
        ></NumberFormat>
      </Grid>

      <Grid item lg={1} xs={1} md={1}>
        {props.showRemoveButton && (
          <button
            style={{ width: 25, color: "red" }}
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(cartRedux.actions.removeItem(props.productId));
            }}
          >
            x
          </button>
        )}
      </Grid>
    </Grid>
  );
}

CartTableItem.propTypes = {
  productId: PropTypes.string,
  productName: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  amount: PropTypes.number,
  showRemoveButton: PropTypes.bool,
};

CartTableItem.defaultProps = {
  productId: "",
  productName: "",
  quantity: 0,
  price: 0,
  amount: 0,
  showRemoveButton: false,
};

export default CartTableItem;
