import React from "react";
import PropsType from "prop-types";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { ColumnIsActive } from "../../_common/components/DataTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProductGroupDetail = (props) => {
  let classes = useStyles();

  let { productGroupName, productGroupId, isActive, createdDate, updatedDate } =
    props;

  return (
    <Container className={classes.paper}>
      <h4>{productGroupName}'s details</h4>
      <Grid container spacing={2}>
        <Grid item xs={3} lg={2}>
          Id
        </Grid>
        <Grid item xs={9} lg={4}>
          {productGroupId}
        </Grid>
        <Grid item xs={3} lg={2}>
          Active
        </Grid>
        <Grid item xs={9} lg={4}>
          <ColumnIsActive value={isActive}></ColumnIsActive>
        </Grid>
        <Grid item xs={3} lg={2}>
          Created Date
        </Grid>
        <Grid item xs={9} lg={4}>
          {createdDate}
        </Grid>
        <Grid item xs={3} lg={2}>
          Updated Date
        </Grid>
        <Grid item xs={9} lg={4}>
          {updatedDate}
        </Grid>
      </Grid>
    </Container>
  );
};

ProductGroupDetail.propTypes = {
  productGroupName: PropsType.string,
  productGroupId: PropsType.string,
  isActive: PropsType.bool,
  createdDate: PropsType.string,
  updatedDate: PropsType.string,
};

ProductGroupDetail.defaultProps = {
  productGroupName: true,
  productGroupId: true,
  isActive: false,
  createdDate: false,
  updatedDate: false,
};

export default ProductGroupDetail;
