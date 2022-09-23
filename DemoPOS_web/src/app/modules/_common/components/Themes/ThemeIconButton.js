import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import useThemeButtonStyle from "./useThemeButtonStyle";

const ThemeIconButton = (props) => {
  let customClassName = useThemeButtonStyle(props.color);
  if (props.disabled) customClassName = null;

  return (
    <IconButton {...props} className={customClassName}>
      {props.children}
    </IconButton>
  );
};

ThemeIconButton.propTypes = {
  color: PropTypes.oneOf([
    "default",
    "inherit",
    "primary",
    "secondary",
    "submit",
    "info",
    "unapprove",
    "edit",
  ]),
  disableFocusRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge: PropTypes.oneOf(["start", "end", false]),
  size: PropTypes.oneOf(["small", "medium"]),
};

export default ThemeIconButton;
