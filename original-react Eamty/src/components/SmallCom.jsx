import React from "react";
import { toast } from "react-toastify";

export const ToastSuccess = (success) => {
  toast.success(success, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

};
export const ToastError = (error) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

};
export const base="http://localhost:5000"

