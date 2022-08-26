import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  FormikTextField,
  FormikDropdown,
  FormikDatePicker,
  FormikTextNumber,
  FormikUploader,
} from "../../_common/components/CustomFormik";
import * as swal from "../../_common/components/SweetAlert";
import * as productGroupApi from "../../ProductGroup/productGroupApi";
import * as productApi from "../productApi";

require("dayjs/locale/th");
var utc = require("dayjs/plugin/utc");
var dayjs = require("dayjs");
dayjs.locale("th");
dayjs.extend(utc);

function ProductAddEdit() {
  let { id } = useParams();
  let history = useHistory();

  const handleClose = () => {
    history.push("/product");
  };

  const handleAddSuccess = (data) => {
    //handle add success
    formik.setSubmitting(false);
    swal.swalSuccess("Created success").then(() => {
      history.push("/product");
    });
  };

  const handleEditSuccess = (data) => {
    //handle edit success
    formik.setSubmitting(false);
    swal.swalSuccess("Update success").then(() => {
      history.push("/product");
    });
  };

  const handleAddError = (err) => {
    //handle add error
      formik.setSubmitting(false);
  };

  const handleUpdateError = (err) => {
    //handle update error
    formik.setSubmitting(false);
  };

  const productGroupList = productGroupApi.useGetAll();
  const selectedProduct = productApi.useGetById(id);
  const addProduct = productApi.useCreate(
    null,
    handleAddSuccess,
    handleAddError
  );
  const editProduct = productApi.useUpdate(
    null,
    handleEditSuccess,
    handleUpdateError
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      //validate selected productGroup
      if (!values.productGroupId) {
        errors.productGroupId = "required";
      }

      //validate name
      if (!values.productName) {
        errors.productName = "required";
      }

      //validate price
      if (values.price < 0) {
        errors.price = "must > or = 0";
      }

      //validate expiry date
      if (!values.expiryDate) {
        errors.expiryDate = "required";
      }

      //validate thumbnail
      if (!id) {
        if (!values.thumbnail) {
          errors.thumbnail="กรุณาเลือกรูป"
        }
      }


      return errors;
    },
    initialValues: {
      productGroupId: selectedProduct.data
        ? selectedProduct.data.productGroupId
        : 0,
      productName: selectedProduct.data ? selectedProduct.data.productName : "",
      price: selectedProduct.data ? selectedProduct.data.price : 0,
      expiryDate: selectedProduct.data ? selectedProduct.data.expiryDate : null,
      thumbnail: selectedProduct.data ? selectedProduct.data.thumbnail : null,
    },
    onSubmit: (values) => {
      let payload = {
        productId: id,
        productGroupId: values.productGroupId,
        productName: values.productName,
        price: values.price,
        expiryDate: dayjs(values.expiryDate).local().format(),
        thumbnail: values.thumbnail,
      };

      if (!id) {
        // new
        addProduct.mutate(payload);
      } else {
        // update
        editProduct.mutate(payload);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: 10 }}>
      <Grid container spacing={2}>
        {id && (
          <Grid item xs={12} md={12} lg={12}>
            <Typography>id: {id}</Typography>
          </Grid>
        )}

        {/* group */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikDropdown
            formik={formik}
            disableFirstItem={true}
            name="productGroupId"
            label="ProductGroup*"
            displayFieldName="productGroupName"
            valueFieldName="productGroupId"
            data={productGroupList.data}
            firstItemText="กรุณาเลือก"
          />
        </Grid>

        {/* Start name */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikTextField
            formik={formik}
            name="productName"
            label="Product Name*"
          />
        </Grid>

        {/* Start price */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikTextNumber formik={formik} name="price" label="Price*" />
        </Grid>

        {/* expiry date */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikDatePicker
            autoOk
            disablePast
            formik={formik}
            name="expiryDate"
            label="Expiry Date*"
          />
        </Grid>
        {/* Thumbnail */}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
        >
        <Grid item xs={12} md={6} lg={6}>
          <FormikUploader
            formik={formik}
            name="thumbnail"
            label="วางไฟล์ (jpg/png)"
            required
            acceptedFiles={[".jpg", ".png"]}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={6}>
          {selectedProduct?.data?.thumbnail && (<img alt="" src={selectedProduct.data.thumbnail}/>) }
        </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} md={3} lg={3}>
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={formik.isSubmitting || !formik.dirty}
              // fullWidth
              onClick={formik.handleSubmit}
            >
              Ok
            </Button>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Button fullWidth variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProductAddEdit;
