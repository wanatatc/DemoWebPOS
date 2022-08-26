// react-> mui -> common -> project
import React from "react";
import PropsType from "prop-types";
import { useHistory } from "react-router-dom";

import { IconButton } from '@material-ui/core';
import { ListAlt, Edit, Delete } from "@material-ui/icons";

const ProductGroupsToolbar = (props) => {
  let { productGroupId, deleteCallback } = props;

  let history = useHistory();
  let productGroupByIdUrl = `/productgroup/${productGroupId}`;
  let productGroupEditUrl = `/productgroup/${productGroupId}/edit`;
  
  return (
    <>
      <IconButton
        variant="contained"
        color="primary"
        onClick={() => {history.push(productGroupByIdUrl);}}
      >
        <ListAlt />
      </IconButton>
      <IconButton
        variant="contained"
        color="primary"
        onClick={() => {history.push(productGroupEditUrl);}}
      >
        <Edit />
      </IconButton>
      <IconButton
        variant="contained"
        color="primary"
        onClick={(productGroupId) => {
          deleteCallback(productGroupId);
        }}
      >
        <Delete />
      </IconButton>
    </>
  );
};

ProductGroupsToolbar.propsType = {
  productGroupId: PropsType.string,
  deleteCallback: PropsType.func,
}

ProductGroupsToolbar.defaultProps = {
  productGroupId: true,
  deleteCallback: true
}

export default ProductGroupsToolbar;
