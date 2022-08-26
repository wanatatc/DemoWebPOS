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
import * as titleApi from "../titleApi";
import * as titleRedux from "../titleRedux";

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

function TitleTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const titleReducer = useSelector(({ title }) => title);
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  const titleData = titleApi.useGetPaginated(
    paginated,
    titleReducer.searchValues
  );
  const titleDelete = titleApi.useDeleteById(null);

  // column
  const columns = [
    {
      name: "id",
      label: "รหัสรายการ",
      options: { sort: false },
    },
    {
      name: "name",
      label: "Name",
      options: { sort: false },
    },
    {
      name: "isActive",
      label: "IsActive",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnIsActive
              value={titleData.data.data[dataIndex].isActive}
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "createdByUsername",
      label: "CreatedBy",
    },
    {
      name: "Created",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={titleData.data.data[dataIndex].createdDate}
            ></ColumnDateTime>
          );
        },
      },
    },
    {
      name: "updatedByUsername",
      label: "UpdatedBy",
    },
    {
      name: "Updated",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={titleData.data.data[dataIndex].updatedDate}
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
              {titleData.data.data[dataIndex].isActive && (
                <React.Fragment>
                  <Grid item xs={12} lg={6}>
                    <EditButton
                      onClick={() => {
                        dispatch(
                          titleRedux.actions.openEdit(
                            titleData.data.data[dataIndex].id
                          )
                        );
                      }}
                    ></EditButton>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <DeleteButton
                      onClick={() => {
                        let id = titleData.data.data[dataIndex].id;
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
          titleDelete.mutate(id);
        }
      });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <StandardDataTable
            name="Title"
            denseTable
            title="Manage Title"
            loading={titleData.isLoading}
            columns={columns}
            data={titleData.data?.data}
            paginated={paginated}
            setPaginated={setPaginated}
            totalRecords={titleData.data?.totalAmountRecords}
          ></StandardDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TitleTable;
