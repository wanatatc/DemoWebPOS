import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as cartRedux from "../cartRedux";
import * as productApi from "../../Product/productApi";
import { AddCircle, Cancel, RemoveCircle, Save } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 6),
  },
  quantity: {
    fontSize: "3rem",
    border: "1px solid #000000",
    padding: "0.5rem 1rem",
    width: "10rem",
    textAlign: "center",
  },
}));

const ProductAdd = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cartReducer = useSelector(({ cart }) => cart);

  if (!cartReducer.addProductOpen) return <></>;

  const productData = productApi.useGetById(cartReducer.selectedProduct);

  if (!productData.isSuccess) return <CircularProgress />;

  const productAddItemHandler = () => {
    let payload = {
      productId: productData.data.productId,
      productName: productData.data.productName,
      price: productData.data.price,
      quantity: cartReducer.currentQuantity,
      amount: cartReducer.currentQuantity * productData.data.price,
    };

    dispatch(cartRedux.actions.addItem(payload));
  };

  return (
    <Container className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h4>{productData.data.productName}</h4>
        </Grid>
        <Grid container item xs={4} justifyContent="center" alignItems="center">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => dispatch(cartRedux.actions.removeProductQuantity())}
          >
            <RemoveCircle />
          </IconButton>
        </Grid>
        <Grid container item xs={4} justifyContent="center" alignItems="center">
          <span className={classes.quantity}>
            {cartReducer.currentQuantity}
          </span>
        </Grid>
        <Grid container item xs={4} justifyContent="center" alignItems="center">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => dispatch(cartRedux.actions.addProductQuantity())}
          >
            <AddCircle />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          xs={12}
          lg={12}
          style={{ marginTop: 10 }}
        >
          <Button
            variant="contained"
            style={{ width: 100, marginRight: 10 }}
            color="primary"
            startIcon={<Save />}
            onClick={() => productAddItemHandler()}
          >
            OK
          </Button>
          <Button
            variant="contained"
            style={{ width: 100, marginLeft: 10 }}
            color="secondary"
            startIcon={<Cancel />}
            onClick={() => dispatch(cartRedux.actions.closeProduct())}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductAdd;
