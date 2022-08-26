/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
function FormikCheckBox(props) {
  return (
    <FormControl
      required={props.required}
      fullWidth
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
      component="fieldset"
    >
      <FormLabel component="legend">{props.formLabel}</FormLabel>
      <FormGroup>
        <FormControlLabel
          name={`${props.name}-label`}
          control={
            <Checkbox
              name={props.name}
              checked={props.formik.values[`${props.name}`]}
              onBlur={props.formik.handleBlur}
              onChange={props.formik.handleChange}
              color={props.color}
              inputProps={{ "aria-label": "primary checkbox" }}
              disabled={props.disabled}
            />
          }
          label={props.label}
        />
      </FormGroup>
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

FormikCheckBox.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  showFormLabel: PropTypes.bool,
  formLabel: PropTypes.string,
  required: PropTypes.bool,
};

FormikCheckBox.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  color: "primary",
  formLabel: "",
  required: false,
};

export default FormikCheckBox;
