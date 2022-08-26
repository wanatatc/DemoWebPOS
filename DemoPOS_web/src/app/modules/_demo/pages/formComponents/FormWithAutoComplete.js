/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import FormikAutoComplete from "../../../_common/components/CustomFormik/FormikAutoComplete";
import FormikRouterPrompt from '../../../_common/components/CustomFormik/FormikRouterPrompt'
import * as demoAxios from "../../_redux/demoAxios";
import * as swal from '../../../_common/components/SweetAlert'

function FormWithAutoComplete() {
  const history = useHistory();
  const [state, setState] = React.useState({
    product: null,
  });

  const loadProduct = (name) => {
    return demoAxios.getProductFilter("name", true, 1, 50, name);
  };

  React.useEffect(() => {
    // ตัวอย่าง สำหรับ load ข้อมูลเพื่อ show
    let id = 1;
    demoAxios
      .getProduct(id)
      .then((res) => {
        if (res.data.isSuccess) {
          let productToSet = { id: res.data.data.id, name: res.data.data.name };
          setState({
            ...state,
            product: productToSet,
          });
        } else swal.swalError('error',res.data.message);
      })
      .catch((err) => {
        swal.swalError('error',err.message);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.product) {
        errors.product = "Required";
      }

      return errors;
    },
    initialValues: {
      product: state.product,
    },
    onSubmit: (values) => {
      swal.swalInfo('info',JSON.stringify(values, null, 2)).then((res)=>{
        formik.setSubmitting(false);
        formik.resetForm()
      });

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikRouterPrompt formik={formik}></FormikRouterPrompt>
      <Alert severity="info" style={{ marginBottom: 10 }}>
        ลองพิมพ์ So, sa
      </Alert>
      <Grid container spacing={3}>
        {/* AutoComplete  */}
        <Grid item xs={12} lg={3}>
          <FormikAutoComplete
            formik={formik}
            name="product"
            label="Product"
            axiosGet={loadProduct.bind(this)}
            valueFieldName="id"
            displayFieldName="name"
            minSearchLen={2}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            disabled={formik.isSubmitting || !formik.dirty}
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            onClick={() => {
              history.push("/demo/formDemo");
            }}
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
      <br></br>
      dirty: {JSON.stringify(formik.dirty)}
    </form>
  );
}

export default FormWithAutoComplete;
