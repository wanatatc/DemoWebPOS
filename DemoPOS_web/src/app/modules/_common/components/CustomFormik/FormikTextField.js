/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

function FormikTextField(props) {
  // formik need these properties to connect with material ui
  // onBlur
  // onChange
  // value
  // error
  // helperText

  return (
    <TextField
      name={props.name}
      label={props.label}
      fullWidth
      autoFocus={props.autoFocus}
      required={props.required}
      onBlur={props.formik.handleBlur}
      onChange={props.formik.handleChange}
      value={props.formik.values[`${props.name}`]}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
      placeholder={props.placeholder}
      helperText={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`]
      }
      disabled={props.disabled}
      type={props.password ? "password" : "text"}
      multiline = {props.multiline}
      rows={props.rows}
      variant={props.variant}
      size={props.size}
    />
  );
}

FormikTextField.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  password: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

// Same approach for defaultProps too
FormikTextField.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
  password: false,
  autoFocus: false,
  placeholder: '',
  variant:'outlined',
  size:''
};

export default FormikTextField;
