import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  StandardDataTable,
  ColumnIsActive,
  ColumnNumber,
  ColumnDateTime,
} from "../../_common/components/DataTable";
import { EditButton, DeleteButton, ViewButton } from "../../_common/components/Buttons";
import * as swal from "../../_common/components/SweetAlert";
import * as productApi from "../productApi";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function ProductTable() {
  const classes = useStyles();
  const history = useHistory();
  const productReducer = useSelector(({ product }) => product);
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  const productData = productApi.useGetPaginated(
    paginated,
    productReducer.searchValues
  );

  const productDelete = productApi.useDeleteById(null);

  const handleDelete = (data) => {
    swal
      .swalConfirm("Confirm Delete", `confirm delete ${data.productName}?`)
      .then((res) => {
        if (res.isConfirmed) {
          productDelete.mutate(data.productId);
        }
      });
  };

  // column
  const columns = [
    {
      name: "productGroupName",
      label: "group",
    },
    {
      name: "productName",
      label: "name",
    },
    {
      name: "price",
      label: "Price",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnNumber
              value={productData.data.data[dataIndex].price}
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
              value={productData.data.data[dataIndex].isActive}
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "Expiry",
      label: "Expiry",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={productData.data.data[dataIndex].expiryDate}
            ></ColumnDateTime>
          );
        },
      },
    },
    {
      name: "createdByUserId",
      label: "created  by",
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              spacing={1}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {productData.data.data[dataIndex].isActive && (
                <React.Fragment>
                  <Grid item xs={12} lg={4}>
                    <ViewButton
                      onClick={() => {
                        history.push(
                          `/product/${productData.data.data[dataIndex].productId}`
                        );
                      }}
                    ></ViewButton>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <EditButton
                      onClick={() => {
                        history.push(
                          `/product/${productData.data.data[dataIndex].productId}/edit`
                        );
                      }}
                    ></EditButton>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <DeleteButton
                      onClick={() => {
                        let data = productData.data.data[dataIndex];
                        handleDelete(data);
                      }}
                    ></DeleteButton>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          );
        },
      },
    },
  ];

  //   const handleDelete = (id) => {
  //     swal
  //       .swalConfirm("Confirm Delete", "Confirm delete this item?")
  //       .then((res) => {
  //         if (res.isConfirmed) {
  //           employeeDelete.mutate(id);
  //         }
  //       });
  //   };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <StandardDataTable
            name="Employee"
            denseTable
            title="Manage Employee"
            loading={productData.isLoading}
            columns={columns}
            data={productData.data?.data}
            paginated={paginated}
            setPaginated={setPaginated}
            totalRecords={productData.data?.totalAmountRecords}
          ></StandardDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductTable;
