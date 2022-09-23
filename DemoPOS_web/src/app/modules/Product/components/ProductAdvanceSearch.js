/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Grid, Button, Paper } from "@material-ui/core/";
import { Icon } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  FormikTextField,
  FormikDropdown,
} from "../../_common/components/CustomFormik";
import ThemeButton from "../../_common/components/Themes/ThemeButton";
function ProductAdvanceSearch(props) {
  const history = useHistory();
  const [filterList] = useState([
    { name: "Product", value: "ProductName" },
    { name: "Group", value: "ProductGroupName" },
  ]);
  return (
    <Paper elevation={3} style={{ marginBottom: 5, padding: 10 }}>
      <form onSubmit={props.formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          alignContent="center"
          justifyContent="center"
        >
          {/* product groups */}
          <Grid item xs={12} lg={3}>
            <FormikDropdown
              formik={props.formik}
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
            <FormikTextField
              formik={props.formik}
              name="searchText"
              label="คำค้น"
              placeholder="คำค้น"
            />
          </Grid>

          <Grid container item xs={12} lg={2}>
            <Button
              type="submit"
              disabled={props.formik.isSubmitting}
              fullWidth
              size="small"
              color="primary"
              variant="contained"
            >
              <Icon>search</Icon>
              Search
            </Button>
          </Grid>

          <Grid container item xs={12} lg={2}>
            <ThemeButton
              color="primary"
              fullWidth
              onClick={() => {
                props.onShowHideAdvance();
              }}
            >
              ปิดค้นหาขั้นสูง
            </ThemeButton>
          </Grid>

          <Grid container item xs={12} lg={2}>
            <ThemeButton
              fullWidth
              //   onClick={handleClickAdd}
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

ProductAdvanceSearch.propTypes = {
  formik: PropTypes.object,
  onShowHideAdvance: PropTypes.func,
};

// Same approach for defaultProps too
ProductAdvanceSearch.defaultProps = {
  formik: {},
  onShowHideAdvance: () => {},
};

export default ProductAdvanceSearch;
