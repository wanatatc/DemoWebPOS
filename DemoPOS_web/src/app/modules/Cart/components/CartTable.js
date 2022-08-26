import React from "react";
import PropsType from "prop-types";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CartTableHeader from "./CartTableHeader";
import CartTableItem from "./CartTableItem";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';

function CartTable(props) {
  const cartReducer = useSelector(({ cart }) => cart);
  const history = useHistory();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} md={12} lg={12}>
        <CartTableHeader showRemoveButton={props.showRemoveButton}></CartTableHeader>
      </Grid>
      {cartReducer.items.map((item, index) => (
        <Grid item xs={12} md={12} lg={12}>
          {" "}
          <CartTableItem
            key={item.productId}
            productId={item.productId}
            price={item.price}
            productName={item.productName}
            quantity={item.quantity}
            amount={item.amount}
            showRemoveButton={props.showRemoveButton}
          ></CartTableItem>
        </Grid>
      ))}
      {props.showCheckoutButton && (
        <Grid item xs={12} md={12} lg={12}>
          <Button
            disabled={!cartReducer.subTotal}
            style={{ backgroundColor: "greenyellow" }}
            fullWidth
            onClick={()=>{
              history.push('checkout')
            }}
          > {`Checkout  : `}  <NumberFormat thousandSeparator={true} value={cartReducer.subTotal} displayType={'text'}  ></NumberFormat></Button>
          
        </Grid>
      )}
    </Grid>
  );
}

CartTable.propTypes = {
  showCheckoutButton: PropsType.bool,
  showRemoveButton: PropsType.bool
};

CartTable.defaultProps = {
  showCheckoutButton: true,
  showRemoveButton: true
};

export default CartTable;
