import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useFormik } from "formik";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import FormikTextField from "../../_common/components/CustomFormik/FormikTextField";
import * as employeeRedux from "../employeeRedux";
import * as employeeApi from "../employeeApi";

export default function EmployeeAddEdit() {
  const dispatch = useDispatch();
  const employeeReducer = useSelector(({ employee }) => employee);
  const selectedEmployee = employeeApi.useGetById(employeeReducer.selectedId);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      formik.setSubmitting(false);
      formik.resetForm();
      dispatch(employeeRedux.actions.close());
    }
  };

  const addEmployee = employeeApi.useCreate(null, handleClose);
  const editEmployee = employeeApi.useUpdate(null, handleClose);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "Required";
      }

      return errors;
    },
    initialValues: {
      employeeNumber: selectedEmployee.data
        ? selectedEmployee.data.employeeNumber
        : "",
      primaryPhone: selectedEmployee.data
        ? selectedEmployee.data.primaryPhone
        : "",
      email: selectedEmployee.data ? selectedEmployee.data.email : "",
      department: selectedEmployee.data ? selectedEmployee.data.department : "",
      title: selectedEmployee.data ? selectedEmployee.data.title : "",
      firstName: selectedEmployee.data ? selectedEmployee.data.firstName : "",
      lastName: selectedEmployee.data ? selectedEmployee.data.lastName : "",
    },
    onSubmit: (values) => {
      //submit ....
      if (employeeReducer.selectedId) {
        //update
        let payload = {
          id: employeeReducer.selectedId,
          employeeNumber: values.employeeNumber,
          primaryPhone: values.primaryPhone,
          email: values.email,
          department: values.department,
          title: values.title,
          firstName: values.firstName,
          lastName: values.lastName,
        };
        editEmployee.mutate(payload);
      } else {
        //new
        let payload = {
          employeeNumber: values.employeeNumber,
          primaryPhone: values.primaryPhone,
          email: values.email,
          department: values.department,
          title: values.title,
          firstName: values.firstName,
          lastName: values.lastName,
        };
        addEmployee.mutate(payload);
      }
    },
  });

  return (
    <Dialog
      open={employeeReducer.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">
        {employeeReducer.selectedId ? "Edit Employee" : "New Employee"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit} style={{ padding: 10 }}>
        <DialogContent style={{ padding: 0 }}>
          <Grid container spacing={0}>
            {/* Start number */}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="employeeNumber"
                label="Employee Number"
                required
              />
            </Grid>

            {/* Start primary phone */}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="primaryPhone"
                label="Primary Phone"
                required
              />
            </Grid>

            {/* Start email*/}
            <Grid item xs={12} lg={12}>
              <FormikTextField formik={formik} name="email" label="Email" />
            </Grid>

            {/* Start department*/}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="department"
                label="Department"
              />
            </Grid>

            {/* Start title*/}
            <Grid item xs={12} lg={12}>
              <FormikTextField formik={formik} name="title" label="Title" />
            </Grid>

            {/* Start f name */}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="firstName"
                label="First Name"
                required
              />
            </Grid>

            {/* Start l name*/}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="lastName"
                label="Last Name"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={formik.isSubmitting || !formik.dirty}
            fullWidth
          >
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
