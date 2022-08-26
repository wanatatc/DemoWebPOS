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
import * as titleRedux from "../titleRedux";
import * as titleApi from "../titleApi";

export default function TitleAddEdit() {
  const dispatch = useDispatch();
  const titleReducer = useSelector(({ title }) => title);
  const selectedTitle = titleApi.useGetById(titleReducer.selectedId);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      formik.setSubmitting(false);
      formik.resetForm();
      dispatch(titleRedux.actions.close());
    }
  };

  const addTitle = titleApi.useCreate(null, handleClose);
  const editTitle = titleApi.useUpdate(null, handleClose);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      }

      return errors;
    },
    initialValues: {
      name: selectedTitle.data ? selectedTitle.data.name : "",
    },
    onSubmit: (values) => {
      //submit ....
      if (titleReducer.selectedId) {
        //update
        let payload = {
          id: titleReducer.selectedId,
          name: values.name,
        };
        editTitle.mutate(payload);
      } else {
        //new
        let payload = {
          name: values.name,
        };
        addTitle.mutate(payload);
      }
    },
  });

  return (
    <Dialog
      open={titleReducer.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">
        {titleReducer.selectedId ? "Edit Title" : "New Title"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit} style={{ padding: 10 }}>
        <DialogContent style={{ padding: 0 }}>
          <Grid container spacing={0}>
            {/* Start name */}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                autoFocus
                name="name"
                label="Name"
                required
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
