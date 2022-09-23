/* eslint-disable no-restricted-imports */
import Swal from "sweetalert2";

const sweetalertDefaultOption = {
  okText: "OK",
  yesText: "Yes",
  cancelText: "Cancel",
  confirmText: "Confirm",
  baseButtonClass: "MuiButtonBase-root MuiButton-root",
  okButtonClass: "MuiButton-contained MuiButton-containedPrimary",
  confirmButtonClass: "MuiButton-contained sweetAlert-confirm",
  cancelButtonClass: "MuiButton-outlined sweetAlert-cancel",
}

export const swalInfo = (title, text) => {
  let confirmButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.okButtonClass;

  return Swal.fire({
    title: title,
    text: text,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonClass,
    },
  });
};

export const swalWarning = (title, text, confirmButtonText = sweetalertDefaultOption.okText) => {
  let confirmButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.okButtonClass;

  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    confirmButtonText: confirmButtonText,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonClass,
    },
  });
};

export const swalConfirm = (title, text, confirmButtonText = sweetalertDefaultOption.yesText, cancelButtonText = sweetalertDefaultOption.cancelText) => {
  let confirmButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.confirmButtonClass;
  let cancelButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.cancelButtonClass;

  return Swal.fire({
    title,
    text,
    icon: "question",
    iconHtml: "?",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    showCancelButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonClass,
      cancelButton: cancelButtonClass,
    },
    reverseButtons: true,
    allowOutsideClick: false,
  });
};

export const swalError = (title, text) => {
  
  let confirmButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.okButtonClass;

  return Swal.fire({
    icon: "error",
    title,
    text,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonClass,
    },
  });
};

export const swalSuccess = (title, text, confirmButtonText = sweetalertDefaultOption.okText) => {
  let confirmButtonClass = sweetalertDefaultOption.baseButtonClass + " " + sweetalertDefaultOption.okButtonClass;

  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonClass,
    },
  });
};
