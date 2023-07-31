import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { ToastError, ToastSuccess, base } from "../../components/SmallCom";

const Category = () => {
  const [loadingState1, setLoadingState1] = React.useState(false);
  const [loadingState2, setLoadingState2] = React.useState(false);
  const [refreshP, setRefreshP] = useState(false);
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);

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

  const addCat = (e) => {
    e.preventDefault();
    setLoadingState1(true)

    const t = e.target;
    console.log(e.target);

    const body = {
      name: t.name.value,
    };

    axios
      .post(`${base}/category`, body)
      .then(function (response) {
        setRefreshP(!refreshP);
        ToastSuccess("Successfully updated");
      })
      .catch(function (error) {
        console.log(error?.message);
        ToastError(error?.message);
      });
      setLoadingState1(false)
  };


  const addBrand = (e) => {
    e.preventDefault();
    setLoadingState2(true) 

    const t = e.target;
    console.log(e.target);

    const body = {
      name: t.name.value,
    };

    axios
      .post(`${base}/brand`, body)
      .then(function (response) {
        setRefreshP(!refreshP);
        ToastSuccess("Successfully updated");
      })
      .catch(function (error) {
        console.log(error?.message);
        ToastError(error?.message);
      });
      setLoadingState2(false)
  };

  return (
    <div>
      <div className="categorybandDiv">
        <div>
          <label htmlFor="">Add Category</label>
          <form onSubmit={addCat} className="catFlex">
            <input type="text" name="name" id="" />
            <LoadingButton
              loading={loadingState1}
              variant="contained"
              type="submit"
            >
              Submit
            </LoadingButton>
          </form>
          <div style={{ marginTop: "40px " }}>
            <h4 style={{ marginBottom: "12px " }}>All categories</h4>
            {cat?.map((c, index) => {
              return (
                <p>
                  {index + 1}. {c.name}
                </p>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="">Add Brand</label>
          <form onSubmit={addBrand} className="catFlex">
            <input type="text" name="name" id="" />
            <LoadingButton
              loading={loadingState2}
              variant="contained"
              type="submit"
            >
              Submit
            </LoadingButton>
          </form>
          <div style={{ marginTop: "40px " }}>
            <h4 style={{ marginBottom: "12px " }}>All brands</h4>
            {brand?.map((c, index) => {
              return (
                <p>
                  {index + 1}. {c.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
