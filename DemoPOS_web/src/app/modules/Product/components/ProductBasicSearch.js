/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Grid, Button, Paper } from "@material-ui/core/";
import { Icon } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  FormikTextField,
  FormikDropdown,
} from "../../_common/components/CustomFormik";
import * as productRedux from "../productRedux";
import ThemeButton from "../../_common/components/Themes/ThemeButton";

function ProductBasicSearch(props) {
  const history = useHistory();

  return (
    <Paper elevation={3} style={{ marginBottom: 5, padding: 10 }}>
      <form onSubmit={props.formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          alignContent="center"
          justifyContent="center"
        >
          {/* Search */}
          <Grid item xs={12} lg={6}>
            <FormikTextField
              formik={props.formik}
              name="searchText"
              label="คำค้น (Product)"
              placeholder="คำค้น (Product)"
            />
          </Grid>

          <Grid container item xs={12} lg={2}>
            <ThemeButton
              type="submit"
              disabled={props.formik.isSubmitting}
              fullWidth
              size="small"
              color="primary"
              variant="contained"
            >
              <Icon>search</Icon>
              Search
            </ThemeButton>
          </Grid>

          <Grid container item xs={12} lg={2}>
            <ThemeButton
              color="primary"
              fullWidth
              onClick={() => {
                props.onShowHideAdvance()
              }}
            >
              ค้นหาขั้นสูง
            </ThemeButton>
          </Grid>

          <Grid container item xs={12} lg={2}>
            <ThemeButton
              fullWidth
              color="submit"
              variant="contained"
              onClick={() => {
                history.push("/product/new");
              }}
            >
              Add +
            </ThemeButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

ProductBasicSearch.propTypes = {
  formik: PropTypes.object,
  onShowHideAdvance: PropTypes.func
};

// Same approach for defaultProps too
ProductBasicSearch.defaultProps = {
  formik: {},
  onShowHideAdvance: ()=>{}
};

export default ProductBasicSearch;
