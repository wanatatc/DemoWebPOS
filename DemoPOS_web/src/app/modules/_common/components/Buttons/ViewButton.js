/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";

function ViewButton(props) {
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
        <ListAlt />
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

ViewButton.propTypes = {
  toolTip: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.string
};

ViewButton.defaultProps = {
  toolTip: "view",
  name: "please-set-name",
  disabled: false,
  label: "please-set-label",
  fullWidth: true,
  size:"small"
};

export default ViewButton;
