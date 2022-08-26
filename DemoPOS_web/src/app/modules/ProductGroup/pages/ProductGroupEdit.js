import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Container, Grid, IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import ProductGroupForm from "../components/ProductGroupForm";

const ProductGroupEdit = () => {
  let { id } = useParams();
  let history = useHistory();

  const productGroupUrl = '/productgroup';

  return (
    <Container>
      <Grid container>
        <Grid container xs={12} justifyContent="flex-start">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {history.push(productGroupUrl);}}
          >
            <ArrowBackIos />
          </IconButton>
          <h2> Product Groups</h2>
        </Grid>
        <Grid item xs={12}>
          <ProductGroupForm title={"Edit Productgroup"} productGroupId={id} closeButton={false}   />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductGroupEdit;
