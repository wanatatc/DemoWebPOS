/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

function DeleteButton(props) {
  return (
    <Tooltip title={props.toolTip}>
      <IconButton
        {...props}
        variant="contained"
        size={props.size}
        color="secondary"
        name={props.name}
        disabled={props.disabled}
        label={props.label}
        fullWidth={props.fullWidth}
      >
        <Delete />
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

DeleteButton.propTypes = {
  toolTip: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.string
};

DeleteButton.defaultProps = {
  toolTip:'delete',
  name: "please-set-name",
  disabled: false,
  label: "please-set-label",
  fullWidth: true,
  size:"small"
};

export default DeleteButton;
