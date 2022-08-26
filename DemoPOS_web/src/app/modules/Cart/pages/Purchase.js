import { Grid, Modal } from "@material-ui/core";
import React from "react";
import ProductDisplay from "../components/ProductDisplay";
import * as cartRedux from "../cartRedux";
import ProductAdd from "../components/ProductAdd";
import { useDispatch, useSelector } from "react-redux";
import CartTable from "../components/CartTable";

const Purchase = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector(({ cart }) => cart);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={8}>
          <ProductDisplay />
        </Grid>
        <Grid item xs={12} md={4}>
          <CartTable />
        </Grid>
      </Grid>
      <Modal
        open={cartReducer.addProductOpen}
        onClose={() => dispatch(cartRedux.actions.closeProduct())}
      >
        <ProductAdd />
      </Modal>
    </React.Fragment>
  );
};

export default Purchase;
