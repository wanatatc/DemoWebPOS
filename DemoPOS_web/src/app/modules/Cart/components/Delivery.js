import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useSelector,useDispatch} from 'react-redux'
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import {
  FormikTextField,
  FormikTextMaskCardId,
} from "../../_common/components/CustomFormik";
import * as swal from "../../_common/components/SweetAlert";
import * as cartRedux from '../cartRedux'


function Delivery(props) {
  let history = useHistory();
  const cartReducer = useSelector(({cart}) => cart);
  const dispatch = useDispatch();
  const handleSuccess = (data) => {
    formik.setSubmitting(false);
    swal.swalSuccess("Success!").then(() => {
      dispatch(cartRedux.actions.reset())
      history.push('/')
    });
  };

  const handleError = (err) => {
    swal.swalError("Failed",err.message)
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      //TODO: Validate values

      if (!values.name) {
        errors.name = "required"
      }

      return errors;
    },
    initialValues: {},
    onSubmit: (values) => {
      let payload = {
        orderName: values.name,
        cardId: values.cardId,
        phoneNo: values.phoneNo,
        address1: values.address1,
        address2: values.address2,
        province: values.province,
        district: values.district,
        subdistrict: values.subdistrict,
        zipCode: values.zipCode,
        orderDetails: cartReducer.items
      }

      //todo mutate
      swal.swalInfo('todo mutate',JSON.stringify(payload)).then(() => {
        handleSuccess(null)
      }).catch((err)=>{
        handleError(err)
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5">Delivery to</Typography>
        </Grid>
        {/* Start name */}
        <Grid item xs={4} md={4} lg={4}>
          <FormikTextField
            formik={formik}
            name="name"
            label="Full Name*"
          />
        </Grid>

        {/* CardId */}
        <Grid item xs={4} md={4} lg={4}>
          <FormikTextMaskCardId formik={formik} name="cardId" label="Card Id*" />
        </Grid>

        {/* Phone */}
        <Grid item xs={4} md={4} lg={4}>
          <FormikTextField formik={formik} name="phoneNo" label="Phone*" />
        </Grid>

        {/* Address1 */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikTextField formik={formik} name="address1" label="Address1*" />
        </Grid>

        {/* Address2 */}
        <Grid item xs={12} md={12} lg={12}>
          <FormikTextField formik={formik} name="address2" label="Address2" />
        </Grid>

        {/* Province */}
        <Grid item xs={12} md={3} lg={3}>
          <FormikTextField formik={formik} name="province" label="Province*" />
        </Grid>

        {/* District */}
        <Grid item xs={12} md={3} lg={3}>
          <FormikTextField formik={formik} name="district" label="District*" />
        </Grid>

        {/* SubDistrict */}
        <Grid item xs={12} md={3} lg={3}>
          <FormikTextField
            formik={formik}
            name="subdistrict"
            label="Sub District*"
          />
        </Grid>

        {/* ZipCode */}
        <Grid item xs={12} md={3} lg={3}>
          <FormikTextField formik={formik} name="zipCode" label="ZipCode*" />
        </Grid>

        <Grid
        style={{marginTop:10}}
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
            >
              Ok
            </Button>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Button fullWidth variant="contained" onClick={()=>{

            }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}


export default Delivery;
