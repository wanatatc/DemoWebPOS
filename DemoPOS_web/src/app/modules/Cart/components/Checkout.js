/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CartTable from "../components/CartTable";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { FormikTextNumber } from "../../_common/components/CustomFormik";
import { useSelector, useDispatch } from "react-redux";

import * as cartRedux from '../cartRedux'

function Checkout() {
  const cartReducer = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
    const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      //validate selected productGroup

      if (values.discount < 0) {
        errors.discount = "invalid discount";
      }

      if (values.total < 0) {
        errors.discount = "invalid discount"
      }

      return errors;
    },
    initialValues: {
      subTotal: cartReducer.subTotal,
      discount: cartReducer.discount,
      total: cartReducer.total
    },
    onSubmit: (values) => {},
  });


  
  React.useEffect(() => {
    dispatch(cartRedux.actions.updateDiscount(+formik.values.discount))
    // formik.setFieldValue('subTotal',cartReducer.subTotal);
    // formik.setFieldValue('total',cartReducer.total)
  }, [formik.values.discount])
  

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid style={{ margin: 20 }} xs={12} lg={12} md={12}>
        <CartTable
          showCheckoutButton={false}
          showRemoveButton={false}
        ></CartTable>
      </Grid>

      <Grid
        item
        xs={12}
        lg={12}
        md={12}
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid item xs={6} md={3} lg={6}>
          <FormikTextNumber formik={formik} name="subTotal" label="SubTotal*" disabled />
        </Grid>

        {/* Start discount */}
        <Grid item xs={6} md={3} lg={6}>
          <FormikTextNumber formik={formik} name="discount" label="Discount*" />
        </Grid>

        <Grid item xs={6} md={3} lg={6}>
          <FormikTextNumber formik={formik} name="total" label="Total*" disabled />
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Checkout;
