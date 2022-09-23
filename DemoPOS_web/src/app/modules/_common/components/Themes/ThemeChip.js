import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";
import useThemeButtonStyle from "./useThemeButtonStyle";

const ThemeChip = (props) => {
  let customClassName = useThemeButtonStyle(props.color, props.variant, "chip");

  return <Chip {...props} className={customClassName} />;
};

ThemeChip.propTypes = {

    
    /**
     * Avatar element.
     */
     avatar: PropTypes.element,
     /**
      * If `true`, the chip will appear clickable, and will raise when pressed,
      * even if the onClick prop is not defined.
      * If false, the chip will not be clickable, even if onClick prop is defined.
      * This can be used, for example,
      * along with the component prop to indicate an anchor Chip is clickable.
      */
     clickable: PropTypes.bool,
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
      * Override the default delete icon element. Shown only if `onDelete` is set.
      */
     deleteIcon: PropTypes.element,
     /**
      * If `true`, the chip should be displayed in a disabled state.
      */
     disabled: PropTypes.bool,
     /**
      * Icon element.
      */
     icon: PropTypes.element,
     /**
      * The content of the label.
      */
     label: PropTypes.node,
     /**
      * Callback function fired when the delete icon is clicked.
      * If set, the delete icon will be shown.
      */
     onDelete: PropTypes.func,
     /**
      * The size of the chip.
      */
     size: PropTypes.oneOf(["small", "medium"]),
     /**
      * The variant to use.
      */
     variant: PropTypes.oneOf(["default", "outlined"]),
};

export default ThemeChip;
