/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as swal from '../SweetAlert'

function FormikAutoComplete(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [isError, setIsError] = React.useState(false)


  React.useEffect(() => {
    if (searchText.length >= props.minSearchLen) {
      setLoading(true);
      props
        .axiosGet(searchText)
        .then((res) => {
          if (res.data.isSuccess) {
            setOptions(res.data.data);
          } else {
            swal.swalError('error',res.data.message);
          }
        })
        .catch((err) => {
          swal.swalError('error',err.message);
        });
    } else {
      setOptions([]);
    }
  }, [searchText]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    setLoading(false);
  }, [options]);

  React.useEffect(() => {
    if (props.formik.errors[`${props.name}`]) {
      setIsError(true)
    }else {
      setIsError(false)
    }
  }, [props.formik.errors[`${props.name}`]])

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>
        option[props.valueFieldName] === value[props.valueFieldName]
      }
      value={props.formik.values[`${props.name}`]}
      getOptionLabel={(option) => option[props.displayFieldName]}
      onChange={(event, value) => {
        if (value) {
          props.formik.setFieldValue(props.name, {
            [props.valueFieldName]: value[props.valueFieldName],
            [props.displayFieldName]: value[props.displayFieldName],
          });
        } else {
          // props.formik.setFieldValue(props.name, {
          //   [props.valueFieldName]: null,
          //   [props.displayFieldName]: null,
          // });
          props.formik.setFieldValue(props.name, null);
        }
      }}
      options={options}
      loading={loading}
      noOptionsText={(searchText.length>=props.minSearchLen)? "ไม่พบข้อมูล":`กรอกอย่างน้อย ${props.minSearchLen} ตัวอักษร`}
      loadingText="กำลังค้นหา"
      onInputChange={(event, value, reason) => {
        setSearchText(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={props.name}
          disabled={props.disabled}
          fullWidth
          helperText={isError ? props.formik.errors[`${props.name}`]: ""}
          error={isError}
          onBlur={() => {
            props.formik.setFieldTouched([`${props.name}`], true, true);
          }}
          label={props.label}
          value={props.formik.values[`${props.name}`]}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

FormikAutoComplete.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  axiosGet: PropTypes.func,
  valueFieldName: PropTypes.string,
  displayFieldName: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.object,
  minSearchLen: PropTypes.number,
};

FormikAutoComplete.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  axiosGet: () => {}, //axios ตัวอย่าง getProduct(searchValue)
  valueFieldName: "id",
  displayFieldName: "name",
  disabled: false,
  defaultValue: { id: "", name: "Do not forget to set defaultValue" },
  minSearchLen: 1,
};

export default FormikAutoComplete;
