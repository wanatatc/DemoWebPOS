import { useTheme } from "@material-ui/core";
import {
  themeStyles,
  useContainedStyles,
  useOutlinedStyles,
  useTextStyles,
} from "../../../../layout/Layout";

const useThemeButtonStyle = (color, variant = null, type = null) => {
  const theme = useTheme();
  const containedClasses = useContainedStyles(theme);
  const outlinedClasses = useOutlinedStyles(theme);
  const textClasses = useTextStyles(theme);

  let customStyle = null;

  if (themeStyles.includes(color)) {
    if (type === "chip") {
      switch (variant) {
        case "outlined":
          customStyle = outlinedClasses;
          break;
        default:
          customStyle = containedClasses;
      }
    } else {
      switch (variant) {
        case "contained":
          customStyle = containedClasses;
          break;
        case "outlined":
          customStyle = outlinedClasses;
          break;
        default:
          customStyle = textClasses;
          break;
      }
    }
  }

  let customClassName = customStyle ? customStyle[color] : null;

  return customClassName;
};

export default useThemeButtonStyle;
