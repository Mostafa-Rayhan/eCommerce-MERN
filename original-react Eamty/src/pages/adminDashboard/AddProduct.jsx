import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {  ToastError, ToastSuccess, base } from "../../components/SmallCom";
import axios from "axios";


const AddProduct = () => {
  const [loadingState, setLoadingState]=useState(false)
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);
  const [refreshP, setRefreshP] = useState(false);
  const [user, setUser]=React.useState()
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [thumb, setThumb]=useState(null)
  // const [allFiles, setAllFiles]=useState([])


 useEffect(()=>{
    if (localStorage.getItem('ecomuser')) {
      let cUser=JSON.parse(localStorage.getItem('ecomuser'));
      setUser(cUser)
    }
  },[])

  React.useEffect(() => {
    axios
      .get(`${base}/category`)
      .then(function (response) {
        // console.log("re", response)
        setCat(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshP]);
  React.useEffect(() => {
    axios
      .get(`${base}/brand`)
      .then(function (response) {
        // console.log("re", response)
        setBrand(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshP]);

  const upload = (e) => {
    e.preventDefault();
    setLoadingState(true)
    const t=e.target;
    const body = {
      product_name:t.name.value,
      brand:t.brand.value,
      category:t.category.value,
      price:t.price.value,
      discounted:t.discounted.value,
      description:t.description.value,
      // image:t.image.value,
      // image2:t.image2.value,
      // image3:t.image3.value,
      // image4:t.image4.value,
      quantity:t.quantity.value,
      sold:t.sold.value,
      owner_name:t.owner_name.value,
      owner:user.email
    };

    console.log("body", body);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    formData.append('thumb', thumb);
    formData.append('product_name', body.product_name);
    formData.append('brand', body.brand);
    formData.append('category', body.category);
    formData.append('price', body.price);
    formData.append('discounted', body.discounted);
    formData.append('description', body.description);
    formData.append('quantity', body.quantity);
    formData.append('sold', body.sold);
    formData.append('owner_name', body.owner_name);
    formData.append('owner', body.owner); 

    axios
      .post(`${base}/product`, formData)
      .then(function (response) {
        ToastSuccess("successfully added")
      })
      .catch(function (error) {
        ToastError(error?.message)
      });
      setLoadingState(false)
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  const handleFileCSingle= (event) => {
    setThumb(event.target.files[0]);
  };

  return (
    <div>
      <div>
        <h4 className="text-3xl"> Upload Product</h4>
        <div className=" " style={{}}>
          <form
            action=""
            className="uploadDiv my-8 w-full "
            onSubmit={upload}
          >
            <div className="  gap-4 mb-4" style={{ display: "flex" }}>
              <label className="w-1/3" htmlFor="">
               Product Name :{" "}
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div>
            <div className="  gap-4 mb-4" style={{ display: "flex" }}>
              <label className="w-1/3" htmlFor="">
               Owner Name :{" "}
              </label>
              <input
                type="text"
                name="owner_name"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Brand :{" "}
              </label>
              <select name="brand" id="">
                {brand?.map(b=>{
                  return (
                    <option value={b.name}>{b.name}</option>
                  )
                })}

              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Category :{" "}
              </label>
              <select name="category" id="">
              {cat?.map(b=>{
                  return (
                    <option value={b.name}>{b.name}</option>
                  )
                })}

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
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Sold:{" "}
              </label>
              <input
                type="number"
                name="sold"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
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
              />
            </div>

            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Thumb :{" "}
              </label>
              <input
              onChange={handleFileCSingle}
                type="file"
                name="thumb"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Images :{" "}
              </label>
              <input
              onChange={handleFileChange}
                type="file"
                name="files"
                multiple
                id=""
                className="w-2/3 border-2 rounded-md p-1"
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
              />
            </div>

            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Image  :{" "}
              </label>
              <input
                type="text"
                name="image2"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Image :{" "}
              </label>
              <input
                type="text"
                name="image3"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-4 mb-4">
              <label className="w-1/3" htmlFor="">
                Image :{" "}
              </label>
              <input
                type="text"
                name="image4"
                id=""
                className="w-2/3 border-2 rounded-md p-1"
              />
            </div> */}

            {/* <div className="w-full flex justify-between items-center gap-4 mb-4">
            <label className="w-1/3" htmlFor="">
              Image :{" "}
            </label>
            <input
              type="file"
              name="name"
              id=""
              className="w-2/3 border-2 rounded-md p-1"
            />
          </div> */}

            <div>
              <LoadingButton loading={loadingState} variant="contained" type="submit">
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
