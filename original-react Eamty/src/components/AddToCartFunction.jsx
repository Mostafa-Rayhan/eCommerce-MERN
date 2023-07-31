import React, { useContext } from "react";
import { ToastError, ToastSuccess } from "./SmallCom";
import { AppContext } from "../app.context";

const AddToCartFunction = (data) => {
  localStorage.removeItem("eComCart")
   const newData = data;
  newData.buyingQuantity = 1;
    localStorage.setItem("eComCart", JSON.stringify([newData]));
    ToastSuccess("succesfully added");

  // const existData = JSON.parse(localStorage.getItem("eComCart"));
  // if (existData) {
  //   const exist = existData.find((f) => f._id == data._id);
  //   if (exist) {
  //     ToastError("Item already added");
  //   } else {
  //     newData.buyingQuantity = 1;
  //     let newExsistData = [...existData, newData];
  //     localStorage.setItem("eComCart", JSON.stringify(newExsistData));
  //     ToastSuccess("succesfully added");
  //   }
  // } else {
  //   newData.buyingQuantity = 1;
  //   localStorage.setItem("eComCart", JSON.stringify([newData]));
  //   ToastSuccess("succesfully added");
  // }
};
export default AddToCartFunction;

export const removefromcart = (data) => {
  const existData = JSON.parse(localStorage.getItem("eComCart"));
  const filtered = existData.filter((f) => f._id != data._id);
  localStorage.setItem("eComCart", JSON.stringify(filtered));
};
export const updateCartPlus = (data) => {
  const existData = JSON.parse(localStorage.getItem("eComCart"));

  const findIndex = existData.findIndex((f) => f._id == data._id);
  const filtered = existData.filter((f) => f._id != data._id);
  const findThis = existData.find((f) => f._id == data._id);
  findThis.buyingQuantity = findThis.buyingQuantity + 1;

  const newArr = [
    ...filtered.slice(0, findIndex),
    findThis,
    ...filtered.slice(findIndex),
  ];

  localStorage.setItem("eComCart", JSON.stringify(newArr));
};
export const updateCartMinus = (data) => {
  const existData = JSON.parse(localStorage.getItem("eComCart"));
  const findIndex = existData.findIndex((f) => f._id == data._id);

  const filtered = existData.filter((f) => f._id != data._id);
  const findThis = existData.find((f) => f._id == data._id);
  if (findThis.buyingQuantity == 1) {
    removefromcart(data);
  } else {
    findThis.buyingQuantity = findThis.buyingQuantity - 1;
    const newArr = [
      ...filtered.slice(0, findIndex),
      findThis,
      ...filtered.slice(findIndex),
    ];
    localStorage.setItem("eComCart", JSON.stringify(newArr));
  }
};

export const logoutUser =()=>{
  localStorage.removeItem("ecomuser")
}

