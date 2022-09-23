import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { Cancel, Delete, Edit, Save } from "@material-ui/icons";
import ThemeIconButton  from "../../../_common/components/Themes/ThemeIconButton";

const FormWithIconButton = () => {
  let variants = [
    { name: "Delete", element: <Delete /> },
    { name: "Edit", element: <Edit /> },
    { name: "Save", element: <Save /> },
    { name: "Cancel", element: <Cancel /> },
  ];
  let buttonStyle = [
    "default",
    "primary",
    "secondary",
    "submit",
    "unapprove",
    "edit",
  ];

  let [option, setOption] = React.useState({
    variant: 0,
    disabled: false,
  });

  return (
    <Container>
      <h1>Button Demo</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          Icons:
        </Grid>
        {variants.map(({ name, element }, index) => (
          <Grid item xs={6} sm={6} md={2} lg={2} key={name}>
            <label>
              <input
                type="radio"
                name="variant"
                value={index}
                onClick={(e) => {
                  setOption({ ...option, variant: e.target.value });
                }}
                checked={option.variant === index}
              />
              {element}
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

      <p>
        <a
          href={"https://v4.mui.com/components/material-icons/"}
          target={"_blank"}
          rel="noreferrer"
        >
          Material Icons
        </a>
      </p>

      <h2>{variants[option.variant].name} Icon</h2>

      <Paper style={{ padding: "1rem" }}>
        <p>หมายเหตุ: อย่าลืมใส่ <code>id="btn"</code> หรือ <code>name="btn"</code> ด้วย</p>
        {buttonStyle.map((element) => {
          return (
            <div>
              <h3 style={{ textTransform: "capitalize" }}>{element}</h3>

              <Grid container>
                <Grid item xs={12} md={2}>
                  <ThemeIconButton color={element} disabled={option.disabled}>
                    {variants[option.variant].element}
                  </ThemeIconButton>
                </Grid>
                <Grid item xs={12} md={10}>
                  <input
                    type="text"
                    value={
                      '<ThemeIconButton color="' +
                      element +
                      '"' +
                      (option.disabled ? " disabled" : "") + '><' +
                      variants[option.variant].name +
                      " /></ThemeIconButton>"
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

export default FormWithIconButton;
