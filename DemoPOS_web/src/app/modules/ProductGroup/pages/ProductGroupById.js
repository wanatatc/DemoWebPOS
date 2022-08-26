// react-> mui -> common -> project
import React from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import {
  ColumnDateTime,
  ColumnIsActive,
  ColumnNumber,
  StandardDataTable,
} from "../../_common/components/DataTable";

import ProductGroupDetail from "../components/ProductGroupDetail";
import * as productGroupApi from "../productGroupApi";

const ProductGroupById = () => {
  // Push back url
  const productGroupUrl = "/productgroup";

  // Get ProductGroup's Id from route
  let { id } = useParams();
  let history = useHistory();

  // Get ProductGroup's detail and propduct in same productgroup;
  let productGroupData = productGroupApi.useGet(id);
  let productsData = productGroupApi.useGetProducts(id, null);

  // Pagination
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  // Table's columns
  const columns = [
    {
      name: "productGroupName",
      label: "Group",
    },
    {
      name: "productName",
      label: "Name",
    },
    {
      name: "price",
      label: "Price",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnNumber
              value={productsData.data.data[dataIndex].price}
            ></ColumnNumber>
          );
        },
      },
    },
    {
      name: "isActive",
      label: "IsActive",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnIsActive
              value={productsData.data.data[dataIndex].isActive}
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "expiryDate",
      label: "Expiry",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={productsData.data.data[dataIndex].expiryDate}
            ></ColumnDateTime>
          );
        },
      },
    },
    {
      name: "createdByUserId",
      label: "Created By",
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid container xs={12} justifyContent="flex-start" alignItems="center">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(productGroupUrl);
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <h2> Product Groups</h2>
          <span style={{ padding: "1rem" }}> / </span>
          <h2>
            {productGroupData.isSuccess ? (
              productGroupData.data.productGroupName
            ) : (
              <CircularProgress />
            )}
          </h2>
        </Grid>
        <Grid item xs={12}>
          {productGroupData.isSuccess ? (
            <ProductGroupDetail {...productGroupData.data} />
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={12}>
          {productGroupData.isSuccess && productsData.isSuccess ? (
            <StandardDataTable
              name="product"
              denseTable
              title={`${productGroupData.data.productGroupName}'s Products`}
              loading={productsData.isLoading}
              columns={columns}
              data={productsData.data?.data}
              paginated={paginated}
              setPaginated={setPaginated}
              totalRecords={productsData.data?.totalAmountRecords}
            ></StandardDataTable>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductGroupById;
