// import React from 'react';
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastError, ToastSuccess, base } from "../../components/SmallCom";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllProduct = () => {
  const [products, setProducts] = React.useState([]);
  const [refreshP, setRefreshP] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState();
  const [loadingState, setLoadingState] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${base}/product`)
      .then(function (response) {
        // console.log("re", response)
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshP]);

  console.log("product", products);

  const editProduct = (e) => {
    e.preventDefault();
    const t = e.target;
    console.log(e.target);

    const body = {
      product_name: t.product_name.value,
      category: t.category.value,
      brand: t.brand.value,
      price: t.price.value,
      discounted: t.discounted.value,
      // image: t.image.value,
      description: t.description.value,
      quantity: t.quantity.value,
      sold: t.sold.value,
    };
    console.log(body);

    axios
      .put(`${base}/product/${modalData._id}`, body)
      .then(function (response) {
        setRefreshP(!refreshP);
        setOpen(false);
        ToastSuccess("Successfully updated");
      })
      .catch(function (error) {
        console.log(error?.message);
        ToastError(error?.message);
      });
  };

  const deleteProduct = (row) => {
    axios
      .delete(`${base}/product/${row._id}`)
      .then(function (response) {
        setRefreshP(!refreshP);
        ToastSuccess("successfully added");
      })
      .catch(function (error) {
        ToastError(error?.message);
      });
    setLoadingState(false);
  };

  const handleOpen = (row) => {
    setOpen(true);
    setModalData(row);
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <form
            action=""
            className=" my-8 w-full uploadForm"
            onSubmit={editProduct}
          >
            <div className="  gap-4 mb-4" style={{ display: "flex" }}>
              <label className="w-1/3" htmlFor="">
                Name :{" "}
              </label>
              <input
                type="text"
                name="product_name"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.product_name}
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Brand :{" "}
              </label>
              <select name="brand" id="" defaultValue={modalData?.brand}>
                <option value="samsung">SAMSUNG</option>
                <option value="lg">LG</option>
                <option value="sony">SONY</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Category :{" "}
              </label>
              <select name="category" id="" defaultValue={modalData?.category}>
                <option value="laptop">Laptop</option>
                <option value="smartphone">Smartphone</option>
                <option value="camera">Camera</option>
              </select>
            </div>

            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                price :{" "}
              </label>
              <input
                type="number"
                name="price"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.price}
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Quantity :{" "}
              </label>
              <input
                type="number"
                name="quantity"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.quantity}
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Sold :{" "}
              </label>
              <input
                type="number"
                name="sold"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.sold}
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                price with discount :{" "}
              </label>
              <input
                type="number"
                name="discounted"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.discounted}
              />
            </div>

            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Description :{" "}
              </label>
              <textarea
                type="text"
                name="description"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.description}
              />
            </div>

            {/* <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Image :{" "}
              </label>
              <input
                type="text"
                name="image"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
                defaultValue={modalData?.image}
              />
            </div> */}

            <div>
              <LoadingButton
                loading={loadingState}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Current Price/Price</TableCell>
              <TableCell align="right">Quantity/sold</TableCell>
              <TableCell align="right">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div>
                    <img
                      src={`${base}/${row.image}` } 
                      alt=""
                      style={{
                        maxHeight: "50px",
                        width: "auto",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell align="right">{row.product_name}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.discounted} <del>{row.price}</del></TableCell>
                <TableCell align="right">{row.quantity}/{row.sold}</TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <button
                      onClick={() => handleOpen(row)}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "blue",
                      }}
                    >
                      <BorderColorIcon />
                    </button> */}
                    <button
                      onClick={() => deleteProduct(row)}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#D10024",
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllProduct;
