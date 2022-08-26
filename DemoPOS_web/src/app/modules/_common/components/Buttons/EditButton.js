/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import { IconButton,Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

function EditButton(props) {
  return (
    <Tooltip title={props.toolTip}>
    <IconButton
      {...props}
      variant="contained"
      size={props.size}
      color="primary"
      name={props.name}
      disabled={props.disabled}
      label={props.label}
      fullWidth={props.fullWidth}
    >
      <Edit />
      {props.children}
    </IconButton>
    </Tooltip>
  );
}

EditButton.propTypes = {
  toolTip: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.string
};

EditButton.defaultProps = {
  toolTip:'edit',
  name: "please-set-name",
  disabled: false,
  label: "please-set-label",
  fullWidth: true,
  size:"small"
};

export default EditButton;
