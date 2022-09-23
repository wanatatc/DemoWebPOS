import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { AddCircle, FormatLineSpacing, Search } from "@material-ui/icons";

import * as swal from "../../_common/components/SweetAlert";
import NavigationMap from "../../../layout/components/NavigationMap";
import {
  StandardDataTable,
  ColumnIsActive,
  ColumnDateTime,
} from "../../_common/components/DataTable";

import ProductGroupsToolbar from "../components/ProductGroupsToolbar";
import ProductGroupForm from "../components/ProductGroupForm";

import * as productGroupRedux from "../productGroupRedux";
import * as productGroupApi from "../productGroupApi";
import ProductGroupList from "../components/ProductGroupList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  idText: {
    display: "inline-block",
    textOverflow: "ellipsis",
    width: "8rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    lineHeight: "0.7rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ProductGroups = () => {
  const classes = useStyles();

  const productGroupByIdUrl = (id) => {
    return '/productgroup/' + id;
  }

  // Redux
  const dispatch = useDispatch();
  const productGroupReducer = useSelector(({ productGroup }) => productGroup);

  // Pagination
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  // Search query string
  const [searchQuery, setSearchQuery] = React.useState({
    FilterColumn: "",
    Value: "",
  });

  // When to refecth api's data
  const [searchEnable, setSearchEnable] = React.useState(true);

  // Get all product group with pagination
  const productGroupsData = productGroupApi.useGetPaginated(
    paginated,
    searchQuery,
    searchEnable,
    () => setSearchEnable(false)
  );

  const productGroupDelete = productGroupApi.useDelete();

  if(productGroupsData.isLoading) return (<CircularProgress />);

  // After paginated action refecth api data
  const paginatedHandeler = (newPaginated) => {
    setPaginated(newPaginated);
    setSearchEnable(true);
  };

  // Open new product group form
  const handleOpen = () => {
    dispatch(productGroupRedux.actions.openAdd());
  };

  // Open reposition form
  const handleOpenDnd = () => {
    dispatch(productGroupRedux.actions.openDnd());
  };

  // Confirm delete product group
  const handleDelete = (id) => {
    swal
      .swalConfirm("Confirm Delete", "Confirm delete this item?")
      .then((res) => {
        if (res.isConfirmed) {
          productGroupDelete.mutate(id);
        }
      });
  };

  // Columns
  const productGroupColumns = [
    {
      name: "Position",
      label: "Position",
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return <>{productGroupsData.data?.data[dataIndex].position}</>;
        },
      },
    },
    {
      name: "ProductGroupName",
      label: "Name",
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Tooltip
              title={productGroupsData.data?.data[dataIndex].productGroupId}
              arrow
            >
              <Link
                to={productGroupByIdUrl(productGroupsData.data?.data[dataIndex].productGroupId)}
              >
                {productGroupsData.data?.data[dataIndex].productGroupName}
              </Link>
            </Tooltip>
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
              value={productGroupsData.data?.data[dataIndex].isActive}
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "createdByUserId",
      label: "CreatedBy",
      options: {
        sort: false,
      },
    },
    {
      name: "UpdatedDate",
      label: "LastUpdate",
      options: {
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={productGroupsData.data?.data[dataIndex].updatedDate}
            ></ColumnDateTime>
          );
        },
      },
    },
    {
      name: "managingTool",
      label: "Manage",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          let id = productGroupsData.data?.data[dataIndex].productGroupId;
          return (
            <ProductGroupsToolbar
              productGroupId={id}
              deleteCallback={() => {
                handleDelete(id);
              }}
            />
          );
        },
      },
    },
  ];

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid container item xs={12} justifyContent="space-between">
          <Grid container item spacing={2} xs={8}>
            <Grid container item xs={3}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="search-label">Search column</InputLabel>
                <Select
                  labelId="search-label"
                  id="search-select"
                  value={searchQuery.FilterColumn}
                  onChange={(event) => {
                    setSearchQuery({
                      ...searchQuery,
                      FilterColumn: event.target.value,
                    });
                  }}
                  label="Search column"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"ProductGroupId"}>Id</MenuItem>
                  <MenuItem value={"ProductGroupName"}>Name</MenuItem>
                  <MenuItem value={"IsActive"}>Active status</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid container item xs={3} alignItems="center">
              <TextField
                label="Search value"
                value={searchQuery.Value}
                onChange={(event) =>
                  setSearchQuery({
                    ...searchQuery,
                    Value: event.target.value,
                  })
                }
              />
            </Grid>

            <Grid container item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Search />}
                onClick={() => setSearchEnable(true)}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <ButtonGroup variant="contained" color="primary">
              <Button onClick={handleOpen} startIcon={<AddCircle />}>
                New
              </Button>
              <Button onClick={handleOpenDnd} startIcon={<FormatLineSpacing />}>
                Reposition
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StandardDataTable
            name="tblProductGroup"
            title="All Product Group"
            denseTable
            loading={productGroupsData.isLoading}
            columns={productGroupColumns}
            data={productGroupsData.data?.data}
            paginated={paginated}
            setPaginated={paginatedHandeler}
            totalRecords={productGroupsData.data?.totalAmountRecords}
          ></StandardDataTable>
        </Grid>
      </Grid>

      <Modal
        open={productGroupReducer.open}
        onClose={() => dispatch(productGroupRedux.actions.reset())}
      >
        <ProductGroupForm
          title={"Add new Product Group"}
          style={{
            position: "absolute",
            width: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          closeButton={true}
        />
      </Modal>

      <Modal
        open={productGroupReducer.openDnd}
        onClose={() => dispatch(productGroupRedux.actions.reset())}
      >
        <ProductGroupList style={{
            position: "absolute",
            width: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }} />
      </Modal>

      <Backdrop
        className={classes.backdrop}
        open={productGroupReducer.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ProductGroups;
