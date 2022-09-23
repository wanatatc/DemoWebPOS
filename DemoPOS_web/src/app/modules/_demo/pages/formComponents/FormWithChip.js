import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { Cancel, Edit, Save } from "@material-ui/icons";
import ThemeChip from "../../../_common/components/Themes/ThemeChip";

const FormWithChip = () => {
  var variants = ["default", "outlined"];
  var buttonStyle = [
    "default",
    "primary",
    "secondary",
    "submit",
    "unapprove",
    "edit",
  ];
  var icons = [
    { name: "None", element: null },
    { name: "Edit", element: <Edit /> },
    { name: "Save", element: <Save /> },
    { name: "Cancel", element: <Cancel /> },
  ];

  var [option, setOption] = React.useState({
    variant: 0,
    icon: 0,
    disabled: false,
    text: "Chip",
  });

  return (
    <Container>
      <h1>Button Demo</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          Demo Text:
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <input
            type="text"
            name="demoText"
            onChange={(e) => {
              setOption({ ...option, text: e.target.value });
            }}
            value={option.text}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          Variants:
        </Grid>
        {variants.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item}>
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
              <span style={{ textTransform: "capitalize" }}>{item}</span>
            </label>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          Icons:
        </Grid>
        {icons.map(({ name, element }, index) => (
          <Grid item xs={6} sm={6} md={2} lg={2} key={name}>
            <label>
              <input
                type="radio"
                name="icon"
                value={index}
                onClick={(e) => {
                  setOption({ ...option, icon: e.target.value });
                }}
                checked={option.icon === index}
              />
              {element ? element : name}
            </label>
          </Grid>
        ))}
      </Grid>

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

      <h2 style={{ textTransform: "capitalize" }}>
        {variants[option.variant]}
      </h2>

      <Paper style={{ padding: "1rem" }}>
        {buttonStyle.map((item, index) => {
          let chipProps = {
            color: item,
          };

          if (option.text !== "") {
            chipProps.label = option.text;
          }

          if (option.variant !== 0) {
            chipProps.variant = variants[option.variant];
          }

          if (option.icon !== 0) {
            chipProps.icon = icons[option.icon].element;
          }

          if (option.disabled) {
            chipProps.disabled = true;
          }

          let propsKeys = Object.keys(chipProps);

          let textProps = propsKeys.map((key) => {
            if(key === "icon") {
              if(chipProps[key] === null) {
                return "";
              }
              
              return `${key}={<${icons[option.icon].name} />}`
            } 

            if(chipProps[key] === true){
              return `${key}`;
            } else {
              return `${key}="${chipProps[key]}"`;
            }
          });

          return (
            <div key={index}>
              <h3 style={{ textTransform: "capitalize" }}>{item}</h3>
              <Grid container>
                <Grid item xs={12} md={2}>
                  <ThemeChip {...chipProps} />
                </Grid>
                <Grid item xs={12} md={10}>
                  <input
                    type="text"
                    value={
                      "<ThemeChip " +
                      // (icons[option.icon].element
                      //   ? " icon={<" + icons[option.icon].name + " />}"
                      //   : "") +
                      // (option.variant == 1 ? " variant='outlined'" : "") +
                      // (item != "default" ? " color='" + item + "'" : "") +
                      // (option.text !== ""
                      //   ? " label='" + option.text + "'"
                      //   : "") +
                      // (option.disabled ? " disabled" : "") +
                      textProps.join(" ") +
                      " />"
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

export default FormWithChip;
