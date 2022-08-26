import React from "react";
import { CircularProgress, Grid, Tab, Tabs } from "@material-ui/core";
import * as productGroupApi from "../../ProductGroup/productGroupApi";
import ProductList from "./ProductList";

const ProductDisplay = () => {
  const [value, setValue] = React.useState(0);

  const productGroups = productGroupApi.useGetAll();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!productGroups.isSuccess) {
    return <CircularProgress />;
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {productGroups.data.map((item, index) => (
            <Tab
              key={index}
              label={item.productGroupName}
              id={"tab-" + index}
              aria-controls={"tabpanel-" + index}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ProductList
          productGroupId={productGroups.data[value].productGroupId}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDisplay;
