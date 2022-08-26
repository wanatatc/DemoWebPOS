/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useFormik } from "formik";
import { Grid, Button, Paper } from "@material-ui/core/";
import { Icon } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {FormikTextField,FormikDropdown} from "../../_common/components/CustomFormik";
import * as productRedux from '../productRedux'

function ProductToolbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const productReducer = useSelector(({product})=>product);
  const [filterList] = useState([
    { name: "Product", value: "ProductName" },
    { name: "Group", value: "ProductGroupName" },
  ]);

  React.useEffect(() => {
   
    return () => {
      dispatch(productRedux.actions.reset())
    }
  }, [])
  
  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      filterColumn: productReducer.searchValues.filterColumn,
      searchText: productReducer.searchValues.value,
    },
    onSubmit: (values) => {
      //submit ....
      let valuesToDispatch = {
        filterColumn: values.filterColumn,
        value: values.searchText
      };
      dispatch(productRedux.actions.updateSearch(valuesToDispatch))
      formik.setSubmitting(false);
    },
  });

  return (
    <Paper elevation={3} style={{ marginBottom: 5, padding: 10 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          alignContent="center"
          justifyContent="center"
        >
          {/* product groups */}
          <Grid item xs={12} lg={3}>
            <FormikDropdown
              formik={formik}
              disableFirstItem={true}
              name="filterColumn"
              label="ค้นหาจาก"
              valueFieldName="value"
              displayFieldName="name"
              data={filterList}
              firstItemText="กรุณาเลือก"
            />
          </Grid>

          {/* Search */}
          <Grid item xs={12} lg={3}>
            <FormikTextField formik={formik} name="searchText" label="Search" />
          </Grid>

          <Grid container item xs={12} lg={2}>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              fullWidth
              size="small"
              color="default"
              variant="contained"
            >
              <Icon>search</Icon>
              Search
            </Button>
          </Grid>

          <Grid container item xs={12} lg={1}>
            <Button
              fullWidth
              //   onClick={handleClickAdd}
              color="primary"
              variant="contained"
              onClick={()=> {
                history.push('/product/new')
              }}
            >
              Add +
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProductToolbar;
