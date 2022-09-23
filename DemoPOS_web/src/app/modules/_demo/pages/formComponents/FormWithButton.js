import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import ThemeButton from "../../../_common/components/Themes/ThemeButton";

const FormWithButton = () => {
  var variants = ["contained", "outlined", "text"];
  var buttonStyle = [
    "default",
    "primary",
    "secondary",
    "submit",
    "unapprove",
    "edit",
  ];

  var [option, setOption] = React.useState({
    variant: variants[0],
    style: 0,
    disabled: false,
  });

  return (
    <Container>
      <h1>Button Demo</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          Variants:
        </Grid>
        {variants.map((item) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={item}>
            <label>
              <input
                type="radio"
                name="variant"
                value={item}
                onClick={(e) => {
                  setOption({ ...option, variant: e.target.value });
                }}
                checked={option.variant === item}
              />
              <span style={{ textTransform: "capitalize" }}>{item}</span>
            </label>
          </Grid>
        ))}
      </Grid>

      <p>
        <label>
          <input
            type="checkbox"
            name="disabled"
            onClick={(e) => {
              setOption({ ...option, disabled: e.target.checked });
            }}
            checked={option.disabled}
          />
          <span>Disabled</span>
        </label>
      </p>

      <h2 style={{ textTransform: "capitalize" }}>{option.variant}</h2>

      <Paper style={{ padding: "1rem" }}>
        <p>หมายเหตุ: อย่าลืมใส่ <code>id="btn"</code> หรือ <code>name="btn"</code> ด้วย</p>
        {buttonStyle.map((element) => {

          let themeButtonProps = (element === "default") ? {} : { color: element };

          if (option.variant !== "text") {
            themeButtonProps.variant = option.variant;
          }

          if (option.disabled) {
            themeButtonProps.disabled = true;
          }

          let propsKeys = Object.keys(themeButtonProps);

          let textProps = propsKeys.map((key) => {
            if(themeButtonProps[key] === true){
              return `${key}`;
            } else {
              return `${key}="${themeButtonProps[key]}"`;
            }
          });

          return (
            <div>
              <h3 style={{ textTransform: "capitalize" }}>{element}</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                  <ThemeButton {...themeButtonProps} fullWidth>
                    {element}
                  </ThemeButton>
                </Grid>
                <Grid item xs={12} md={10}>
                  <input
                    type="text"
                    value={
                      '<ThemeButton ' +
                      textProps.join(' ') +
                       ">" +
                       element +
                      "</ThemeButton>"
                    }
                    style={{ width: "100%", padding: "1rem" }}
                    onClick={(e) => {
                      e.target.select();
                      document.execCommand("copy");
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Paper>
    </Container>
  );
};

export default FormWithButton;
