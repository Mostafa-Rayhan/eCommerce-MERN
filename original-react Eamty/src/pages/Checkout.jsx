import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastError, base } from "../components/SmallCom";
import { AppContext } from "../app.context";
import TopBar from "../components/TopBar";

const Checkout = () => {
  const [shippingData, setShippingData] = useState({});
  const { refresh, setRefresh, carts, setCarts, cartTotal } =
    useContext(AppContext);
    const [loading, setLoading]=useState(false)
    const [user, setUser]=React.useState()

    React.useEffect(()=>{
      if (localStorage.getItem('ecomuser')) {
        let cUser=JSON.parse(localStorage.getItem('ecomuser'));
        setUser(cUser)
        setShippingData({...shippingData,email:cUser.email})
      }
    },[])


    const checking=(d,s)=>{
      console.log("d",d,s);
      console.log("s",s[d]);
      if ( s[d] == undefined || s[d] == null || s[d]=="") {
        ToastError(`${d}, is required `)

        return "not"
      }
      return "yes"

    }

  const handleChange = (e) => {
    e.preventDefault();


    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };
  console.log("shi", shippingData);





  const placeOrder = () => {


    if( user?.role=="admin" ||  user?.role=="whole_seller"){
      ToastError("whole seller or admin can not buy")
      return ;
    }

    setLoading(true)
if(
  checking("email", shippingData) =="not" ||
  checking("tel", shippingData) =="not" ||
  checking("zip_code", shippingData) =="not" ||
  checking("country", shippingData) =="not" ||
  checking("city", shippingData) =="not" ||
  checking("address", shippingData) =="not" ||
  checking("first_name", shippingData) =="not"
) {
  return
}


    const body = {
     ...shippingData,
     total_price:cartTotal,
     owner:JSON.parse(localStorage.getItem("eComCart"))[0].owner,
     items : JSON.parse(localStorage.getItem("eComCart"))
    };


    axios
    .post(`${base}/order`, body)
    .then(function (response) {
      // setRefreshP(!refreshP);
      // ToastSuccess("Successfully updated");
      console.log("res", response.data.url);
      window.location.replace(response.data.url);
    })
    .catch(function (error) {
      console.log(error?.message);
      // ToastError(error?.message);
    });
    setLoading(false)

  };

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <TopBar></TopBar> 
      <div id="breadcrumb" className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <h3 className="breadcrumb-header">Checkout</h3>
              <ul className="breadcrumb-tree">
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="active">Checkout</li>
              </ul>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /BREADCRUMB --> */}

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-7">
              {/* <!-- Billing Details --> */}
              <form className="billing-details">
                <div className="section-title">
                  <h3 className="title">Shipping address {loading && <span style={{color:"red", fontSize:"16px"}}>Loading...</span>}</h3>
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="city"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="country"
                    placeholder="Country"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    name="zip_code"
                    placeholder="ZIP Code"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="tel"
                    name="tel"
                    placeholder="Telephone"
                  />
                </div>
                <div className="order-notes">
                  <textarea
                    onChange={handleChange}
                    name="order_note"
                    className="input"
                    placeholder="Order Notes"
                  ></textarea>
                </div>
                {/* <div className="form-group">
                  <div className="input-checkbox">
                    <input type="checkbox" id="create-account" />
                    <label for="create-account">
                      <span></span>
                      Create Account?
                    </label>
                    <div className="caption">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt.
                      </p>
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                      />
                    </div>
                  </div>
                </div> */}
              </form>
              {/* <!-- /Billing Details --> */}

              {/* <!-- Shiping Details --> */}
              {/* <div className="shiping-details">
                <div className="section-title">
                  <h3 className="title">Shiping address</h3>
                </div>
                <div className="input-checkbox">
                  <input type="checkbox" id="shiping-address" />
                  <label for="shiping-address">
                    <span></span>
                    Ship to a diffrent address?
                  </label>
                  <div className="caption">
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="last-name"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="address"
                        placeholder="Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="city"
                        placeholder="City"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="country"
                        placeholder="Country"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        name="zip-code"
                        placeholder="ZIP Code"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="tel"
                        name="tel"
                        placeholder="Telephone"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <!-- /Shiping Details --> */}

              {/* <!-- Order notes --> */}
              {/* <div className="order-notes">
                <textarea
                  className="input"
                  placeholder="Order Notes"
                ></textarea>
              </div> */}
              {/* <!-- /Order notes --> */}
            </div>

            {/* <!-- Order Details --> */}
            <div className="col-md-5 order-details">
              <div className="section-title text-center">
                <h3 className="title">Your Order</h3>
              </div>
              <div className="order-summary">
                <div className="order-col">
                  <div>
                    <strong>PRODUCT</strong>
                  </div>
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                </div>
                <div className="order-products">
                  {carts?.map((c) => {
                    return (
                      <div className="order-col" key={c._id}>
                        <div>{c.buyingQuantity}x {c.product_name}</div>
                        <div>TK {c.discounted * c.buyingQuantity}</div>
                      </div>
                    );
                  })}

                </div>
                <div className="order-col">
                  <div>Shiping</div>
                  <div>
                    <strong>FREE</strong>
                  </div>
                </div>
                <div className="order-col">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong className="order-total">TK {cartTotal}</strong>
                  </div>
                </div>
              </div>
              {/* <div className="payment-method">
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-1" />
                  <label for="payment-1">
                    <span></span>
                    Direct Bank Transfer
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-2" />
                  <label for="payment-2">
                    <span></span>
                    Cheque Payment
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-3" />
                  <label for="payment-3">
                    <span></span>
                    Paypal System
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div> */}
              {/* <div className="input-checkbox">
                <input type="checkbox" id="terms" />
                <label for="terms">
                  <span></span>
                  I've read and accept the <a href="#">terms & conditions</a>
                </label>
              </div> */}
              <button   onClick={placeOrder} className="primary-btn order-submit">
                Place order
              </button>
              {/* <a href="#" className="primary-btn order-submit">
                Place order
              </a> */}
            </div>
            {/* <!-- /Order Details --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Checkout;
