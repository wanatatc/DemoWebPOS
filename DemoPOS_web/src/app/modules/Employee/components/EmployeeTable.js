/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import StandardDataTable from "../../_common/components/DataTable/StandardDataTable";
import ColumnDateTime from "../../_common/components/DataTable/ColumnDateTime";
import ColumnIsActive from "../../_common/components/DataTable/ColumnIsActive";
import EditButton from "../../_common/components/Buttons/EditButton";
import * as swal from "../../_common/components/SweetAlert";
import DeleteButton from "../../_common/components/Buttons/DeleteButton";
import * as employeeApi from "../employeeApi";
import * as employeeRedux from "../employeeRedux";

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

function EmployeeTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const employeeReducer = useSelector(({ employee }) => employee);
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  const employeeData = employeeApi.useGetPaginated(
    paginated,
    employeeReducer.searchValues
  );
  const employeeDelete = employeeApi.useDeleteById(null);

  // column
  const columns = [
    {
      name: "employeeNumber",
      label: "รหัสรายการ",
      options: { sort: true },
    },
    {
      name: "firstName",
      label: "First Name",
      options: { sort: true },
    },
    {
        name: "lastName",
        label: "Last Name",
        options: { sort: true },
      },
    {
      name: "isActive",
      label: "IsActive",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnIsActive
              value={employeeData.data.data[dataIndex].status}
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "createdAt",
      label: "Created",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={employeeData.data.data[dataIndex].createdAt}
            ></ColumnDateTime>
          );
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={employeeData.data.data[dataIndex].updatedAt}
            ></ColumnDateTime>
          );
        },
      },
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
              {employeeData.data.data[dataIndex].isActive && (
                <React.Fragment>
                  <Grid item xs={12} lg={6}>
                    <EditButton
                      onClick={() => {
                        dispatch(
                          employeeRedux.actions.openEdit(
                            employeeData.data.data[dataIndex].id
                          )
                        );
                      }}
                    ></EditButton>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <DeleteButton
                      onClick={() => {
                        let id = employeeData.data.data[dataIndex].id;
                        handleDelete(id);
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

  const handleDelete = (id) => {
    swal
      .swalConfirm("Confirm Delete", "Confirm delete this item?")
      .then((res) => {
        if (res.isConfirmed) {
          employeeDelete.mutate(id);
        }
      });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <StandardDataTable
            name="Employee"
            denseTable
            title="Manage Employee"
            loading={employeeData.isLoading}
            columns={columns}
            data={employeeData.data?.data}
            paginated={paginated}
            setPaginated={setPaginated}
            totalRecords={employeeData.data?.totalAmountRecords}
          ></StandardDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EmployeeTable;
