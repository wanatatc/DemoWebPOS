// react-> mui -> common -> project
import React from "react";
import PropsType from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { makeStyles } from "@material-ui/styles";
import { Button, Container, Grid, IconButton } from "@material-ui/core";
import { Cancel, Close, Save } from "@material-ui/icons";

import FormikTextField from "../../_common/components/CustomFormik/FormikTextField";
import { swalSuccess } from "../../_common/components/SweetAlert";

import * as productGroupRedux from "../productGroupRedux";
import * as productGroupApi from "../productGroupApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProductGroupForm = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let productGroupUrl = "/productgroup";

  let { title, style, closeButton, productGroupId } = props;


  const dispatch = useDispatch();

  // When click close or cancel button
  const handleClose = () => dispatch(productGroupRedux.actions.reset());

  // update error
  const handleError = (err) => {
    formik.setSubmitting(false)
  }

  // Add Api's add and edit mutation
  const addProductgroup = productGroupApi.useCreate(null, handleClose,handleError);
  const editProductgroup = productGroupApi.useUpdate(productGroupId,handleError);

  // Get product group's data, if update
  let productGroupData = null;

  const intitialValue = {
    productGroupName: "",
  };

  if (productGroupId !== null && productGroupId !== false) {
    productGroupData = productGroupApi.useGet(productGroupId);
    if (productGroupData.isSuccess) {
      intitialValue.productGroupName = productGroupData.data?.productGroupName;
    }
  }

  // Formik

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: intitialValue,
    onSubmit: (values) => {
      let payload = {
        productGroupName: values.productGroupName,
      };

      dispatch(productGroupRedux.actions.saving());

      if (productGroupId == null || productGroupId == false) {
        // Create
        addProductgroup.mutate(payload);
      } else {
        // Edit
        editProductgroup.mutate(payload);
      }

      swalSuccess("Yes", "Success!");
      handleClose();
    },
  });

  return (
    <Container className={classes.paper} style={(style !== false) ? style : {}}>
      <form onSubmit={formik.handleSubmit}>
        {/** Header */}
        <Grid container>
          <Grid item xs={10}>
            <h2>{title}</h2>
          </Grid>
          <Grid container item xs={2} justifyContent="flex-end">
            {closeButton === true ? (
              <IconButton
                onClick={handleClose}
                variant="contained"
                color="primary"
              >
                <Close />
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        {/** Body */}
        <Grid container spacing={4} style={{ margin: "auto" }}>
          <Grid container item xs={12} spacing={4}>
            <FormikTextField
              formik={formik}
              name="productGroupName"
              label="Name"
              required
            />
          </Grid>

          <Grid container item xs={12} justifyContent="flex-end" spacing={2}>
            <Grid container item xs={12} md={3} justifyContent="flex-end">
              <Button
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !formik.dirty}
                variant="contained"
                color="primary"
                startIcon={<Save />}
                style={{ width: "100%" }}
              >
                Ok
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} justifyContent="flex-end">
              {closeButton === true ? (
                <Button
                  onClick={handleClose}
                  variant="contained"
                  startIcon={<Cancel />}
                  style={{ width: "100%" }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    history.push(productGroupUrl);
                  }}
                  variant="contained"
                  startIcon={<Cancel />}
                  style={{ width: "100%" }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

ProductGroupForm.propsTypes = {
  title: PropsType.string,
  style: PropsType.any,
  closeButton: PropsType.bool,
  productGroupId: PropsType.string,
};

ProductGroupForm.defaultProps = {
  title: true,
  style: false,
  closeButton: false,
  productGroupId: false,
};

export default ProductGroupForm;
