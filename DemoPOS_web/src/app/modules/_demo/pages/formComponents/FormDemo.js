/* eslint-disable no-restricted-imports */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    "& .MuiButton-label": {
      textTransform: "capitalize",
    },
  },
}));

function FormDemo() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container>
      <h1>Demo component</h1>

      <h2>New! Theme component</h2>

      <ul className={classes.list}>
        <li>
          <Button
            color="primary"
            onClick={() => {
              history.push("/demo/formWithButton");
            }}
          >
            &lt;ThemeButton /&gt;
          </Button>
        </li>

        <li>
          <Button
            color="primary"
            onClick={() => {
              history.push("/demo/formWithIconButton");
            }}
          >
            &lt;ThemeIconButton /&gt;
          </Button>
        </li>
        <li>
          <Button
            color="primary"
            onClick={() => {
              history.push("/demo/formWithChip");
            }}
          >
            &lt;ThemeChip /&gt;
          </Button>
        </li>
      </ul>

      <h2>Formik</h2>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h3>Text Input</h3>
          <ul className={classes.list}>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithTextField");
                }}
              >
                TextFields
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithTextNumber");
                }}
              >
                TextNumber
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithTextMaskCardId");
                }}
              >
                TextMaskCardId
              </Button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3>Checkbox</h3>
          <ul className={classes.list}>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithCheckBox");
                }}
              >
                Checkbox
              </Button>
            </li>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithCheckboxGroup");
                }}
              >
                CheckboxGroup
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithRadioGroup");
                }}
              >
                Radio Group
              </Button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3>Date &amp; Time</h3>
          <ul className={classes.list}>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDatePicker");
                }}
              >
                DatePicker
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithCustomDateBE");
                }}
              >
                DatePicker BE
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDateTimePicker");
                }}
              >
                DateTimePicker
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDateRangePicker");
                }}
              >
                DateRangePicker
              </Button>
            </li>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithTimePicker");
                }}
              >
                TimePicker
              </Button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3>Dropdown</h3>
          <ul className={classes.list}>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithAutoComplete");
                }}
              >
                AutoComplete
              </Button>
            </li>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDropdown");
                }}
              >
                Dropdown
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDropdownMultiple");
                }}
              >
                Dropdown Multiple
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithDropdownCascade");
                }}
              >
                Dropdown Cascade
              </Button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3>Other</h3>
          <ul className={classes.list}>
            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithRating");
                }}
              >
                Rating
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithSlider");
                }}
              >
                Slider
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithSwitch");
                }}
              >
                Switch
              </Button>
            </li>

            <li>
              <Button
                color="primary"
                onClick={() => {
                  history.push("/demo/formWithUploader");
                }}
              >
                Uploader
              </Button>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormDemo;
