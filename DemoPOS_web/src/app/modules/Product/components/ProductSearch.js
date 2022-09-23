/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as productRedux from "../productRedux";
import ProductBasicSearch from "./ProductBasicSearch";
import ProductAdvanceSearch from "./ProductAdvanceSearch";

function ProductSearch() {
  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);

  const [state, setState] = useState({
    showAdvance: false,
  });

  React.useEffect(() => {
    return () => {
      dispatch(productRedux.actions.reset());
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      filterColumn: productReducer.searchValues.filterColumn,
      searchText: productReducer.searchValues.value,
    },
    onSubmit: (values) => {

      //submit ....
      let valuesToDispatch = {
        filterColumn: values.filterColumn? values.filterColumn: productReducer.searchValues.filterColumn,
        value: values.searchText,
      };

      dispatch(productRedux.actions.updateSearch(valuesToDispatch));
      formik.setSubmitting(false);
    },
  });

  return (
    <React.Fragment>
      {/* advance search */}
      {state.showAdvance && (
        <ProductAdvanceSearch formik={formik} onShowHideAdvance={() => {
            setState({...state,showAdvance: !state.showAdvance})
        }}></ProductAdvanceSearch>
      )}

      {/* basic search */}
      {!state.showAdvance && (
        <ProductBasicSearch formik={formik} onShowHideAdvance={() => {
            setState({...state,showAdvance: !state.showAdvance})
        }}></ProductBasicSearch>
      )}
    </React.Fragment>
  );
}

export default ProductSearch;
