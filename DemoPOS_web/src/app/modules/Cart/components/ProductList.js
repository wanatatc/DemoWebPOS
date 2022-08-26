import React from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, Grid, TablePagination } from "@material-ui/core";
import * as productGroupApi from "../../ProductGroup/productGroupApi";
import * as cartRedux from "../cartRedux";
import ProductListItem from "./ProductListItem";

const ProductList = ({ productGroupId }) => {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 8,
    orderingField: "",
    ascendingOrder: true,
  });

  const dispatch = useDispatch();

  const productsData = productGroupApi.useGetProducts(
    productGroupId,
    paginated
  );

  if (!productsData.isSuccess) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={5}
      style={{ margin: "0.5rem" }}
    >
      {productsData.data.data.map((item, index) => (
        <ProductListItem
          productDetail={item}
          openHandler={(productId) =>
            dispatch(cartRedux.actions.openProduct(productId))
          }
        />
      ))}

    </Grid>
          <Grid container item xs={12} lg={12}>
          <TablePagination
            style={{ width: "100%" }}
            page={paginated.page - 1}
            rowsPerPageOptions={[4, 8, 12, 16]}
            rowsPerPage={paginated.recordsPerPage}
            count={productsData.data.totalAmountRecords}
            onPageChange={(e, newPage) =>
              setPaginated({ ...paginated, page: newPage + 1 })
            }
            onRowsPerPageChange={(e) =>
              setPaginated({
                ...paginated,
                recordsPerPage: parseInt(e.target.value, 10),
                page: 1,
              })
            }
          />
        </Grid>
        </React.Fragment>
  );
};

export default ProductList;
