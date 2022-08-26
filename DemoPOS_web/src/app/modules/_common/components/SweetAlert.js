/* eslint-disable no-restricted-imports */
import Swal from "sweetalert2";
import { red } from "@material-ui/core/colors";

export const swalInfo = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
  });
};

export const swalWarning = (title, text, confirmButtonText = "Yes") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    confirmButtonText,
  });
};

export const swalConfirm = (title, text, confirmButtonText = "Yes", cancelButtonText = "No") => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    iconHtml: "?",
    confirmButtonText,
    cancelButtonText,
    showCancelButton: true,
    cancelButtonColor: red[100],
    allowOutsideClick: false,
  });
};

export const swalError = (title, text) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const swalSuccess = (title, text, confirmButtonText = "Ok") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText,
  });
};
