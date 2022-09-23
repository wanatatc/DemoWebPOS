import React from "react";
import PropTypes from "prop-types";
import { Button} from "@material-ui/core";
import useThemeButtonStyle from "./useThemeButtonStyle";


const ThemeButton = (props) => {
  let customClassName = useThemeButtonStyle(props.color, props.variant);
  if(props.disabled) customClassName = null;

  return (
    <Button {...props} className={customClassName}>
      {props.children}
    </Button>
  );
};

ThemeButton.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.element,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * By these following value: 'default', 'inherit', 'primary', 'secondary', 'submit', 'info', 'unapprove', 'edit'
   */
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
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.element,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.element,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
};

export default ThemeButton;
