import React, { useContext, useState } from "react";
import { AppContext } from "../app.context";
import TopBar from "../components/TopBar";
import {
  updateCartMinus,
  updateCartPlus,
} from "../components/AddToCartFunction";
import { useNavigate } from "react-router-dom";
import { ToastError, base } from "../components/SmallCom";

const Carts = () => {
  const { refresh, setRefresh, carts, setCarts, cartTotal } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState("");
  const navigate = useNavigate()
  const [user, setUser]=React.useState()

  React.useEffect(()=>{
    if (localStorage.getItem('ecomuser')) {
      let cUser=JSON.parse(localStorage.getItem('ecomuser'));
      setUser(cUser)
    }
  },[])

  const increase = (c) => {
    setLoading(true);
    setLoadingId(c._id);
    updateCartPlus(c);
    setRefresh(!refresh);
    setLoading(false);
  };
  const decrease = (c) => {
    setLoading(true);
    setLoadingId(c._id);
    updateCartMinus(c);
    setRefresh(!refresh);
    setLoading(false);
  };

  const checkoutnavigate =(e)=>{

    if( user?.role=="admin" ||  user?.role=="whole_seller"){
      ToastError("whole seller or admin can not buy")
      return ;
    }
    else {
      navigate("/checkout")
    }

  }

  return (
    <div>
      <TopBar></TopBar>
      <div style={{ marginTop: "80px " }} className="cartsSection">
        {carts?.map((c) => {
          return (
            <div className="singleCart" style={{ textAlign: "left " }}>
              <div className="nameImage">
                <img src={`${base}/${c.image}` } alt="" />
                <div>
                  <h4>{c.product_name}</h4>
                  <p style={{ marginBottom: "0px ", fontWeight: 600 }}>
                    Quantity : {c.buyingQuantity}
                  </p>
                  <p style={{ marginBottom: "0px ", fontWeight: 600 }}>
                    Item Total Price : {c.discounted * c.buyingQuantity}
                  </p>
                </div>
              </div>
              {/* <div>{loading && loadingId == c._id && <p>Loading...</p>}</div> */}
              <div>
                <div className="btnsCart">
                  <button onClick={() => increase(c)}>+</button>
                  <button onClick={() => decrease(c)}>-</button>
                </div>
                {/* <button onClick={()=>setCarts([])}>Remove</button> */}
              </div>
            </div>
          );
        })}

        <div className="othersCart">
          <h4>Total : {cartTotal} TK</h4>
          <button  className="checkoutBtnCart" onClick={checkoutnavigate} >Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
