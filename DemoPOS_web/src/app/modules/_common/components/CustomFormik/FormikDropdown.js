import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  inputRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2
    }
  },
  input: {
    borderRadius: 3,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #CCCCCC',
    fontSize: 12,
    padding: '6px 8px',
    '&:focus': {
      borderColor: '#80bdff'
    }
  },
  inputLabelRoot: {
    color: '#555555',
    fontWeight: 'bold',
    '&$formLabelFocused': {
      color: '#555555'
    }
  },
  formLabelFocused: {}

}))(InputBase);

function FormikDropdown(props) {
  return (
    <FormControl
      fullWidth
      disabled={props.disabled}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        name={props.name}
        value={props.formik.values[`${props.name}`]}
        onBlur={props.formik.handleBlur}
        onChange={(event) => {
          props.formik
            .setFieldValue(props.name, event.target.value)
            .then(() => {
              props.formik
                .setFieldValue(
                  `${props.name}_selectedText`,
                  event.nativeEvent.target.innerText
                )
                .then(() => {
                  props.selectedCallback(event.target.value);
                });
            });
        }}
        input={props.input === true && <BootstrapInput />}
      >
        <MenuItem disabled={props.disableFirstItem} value={0}>
          <em>{props.firstItemText}</em>
        </MenuItem>
        {props.data.map((item) => (
          <MenuItem
            key={`${props.name}_${item[`${props.valueFieldName}`]}`}
            value={item[`${props.valueFieldName}`]}
            disabled={props.disabledItemId.includes(item[`${props.valueFieldName}`])}
          >
            {item[`${props.displayFieldName}`]}
          </MenuItem>
        ))}
      </Select>
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

FormikDropdown.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  valueFieldName: PropTypes.string,
  displayFieldName: PropTypes.string,
  firstItemText: PropTypes.string,
  disableFirstItem: PropTypes.bool,
  selectedCallback: PropTypes.func,
  disabled: PropTypes.bool,
  input: PropTypes.bool,
  disabledItemId: PropTypes.array,
};

// Same approach for defaultProps too
FormikDropdown.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  data: [{ id: 0, name: "Do not forget to set data" }],
  valueFieldName: "id",
  displayFieldName: "name",
  firstItemText: "Do not forget to set firstItemText",
  disableFirstItem: true,
  selectedCallback: () => { },
  disabled: false,
  input: false,
  disabledItemId: []
};

export default FormikDropdown;
