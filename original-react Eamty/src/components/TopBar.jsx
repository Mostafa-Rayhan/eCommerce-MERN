import React, { useContext, useState } from "react";
import logo from "../assets/img/logo.png";
import axios from "axios";
import { base } from "./SmallCom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../app.context";
import { logoutUser, removefromcart } from "./AddToCartFunction";

const TopBar = () => {
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const { refresh, setRefresh, carts, setCarts } = useContext(AppContext);
  const [user, setUser]=React.useState()

  React.useEffect(()=>{
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
  }, []);
  const searchBtn = () => {
    navigate("/store");
  };

  const removeFromCart = (c) => {
    removefromcart(c);
    setRefresh(!refresh);
  };
  console.log("carts", carts);

  const menuClick = (e) => {
    e.preventDefault();
    const responsiveNav = document.querySelector("#responsive-nav");
    console.log("clicking", responsiveNav);
    if (responsiveNav) {
      if (responsiveNav.classList.contains("active")) {
        responsiveNav.classList.remove("active");
      } else {
        responsiveNav.classList.add("active");
      }
    }
  };

  const logout=()=>{
    logoutUser()
    setRefresh(!refresh)
    navigate('/')
  }

  console.log("user", user );
  console.log("lenth", carts);
  return (
    <div>
      <header>
        {/* <!-- TOP HEADER --> */}
        <div id="top-header">
          <div className="container">
            <ul className="header-links pull-left">
              <li>
                <a href="#">
                  <i className="fa fa-phone"></i> +021-95-51-84
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope-o"></i> email@email.com
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
                </a>
              </li>
            </ul>
            <ul className="header-links pull-right">
              {/* <li>
                <a href="#">
                  <i className="fa fa-dollar"></i> USD
                </a>
              </li> */}

              {user &&
              <li>
              <button onClick={logout} className="logoutBtn" style={{backgroundColor:"transparent", color:"white", fontWeight:"700"}}>Log out</button>
            </li>
            }
              <li>
                <a href="admin">
                  <i className="fa fa-user-o"></i> My Account
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- /TOP HEADER --> */}

        {/* <!-- MAIN HEADER --> */}
        <div id="header">
          {/* <!-- container --> */}
          <div className="container">
            {/* <!-- row --> */}
            <div className="row">
              {/* <!-- LOGO --> */}
              <div className="col-md-3">
                <div className="header-logo">
                  <a href="/" className="logo">
                    <img src={logo} alt="" />
                  </a>
                </div>
              </div>
              {/* <!-- /LOGO --> */}

              {/* <!-- SEARCH BAR --> */}
              <div className="col-md-6">
                <div className="header-search">
                  <form>
                    <select className="input-select">
                      <option value="">All Categories</option>
                      {cat?.map((c) => {
                        return <option value={c.name}>{c.name}</option>;
                      })}
                    </select>
                    <input className="input" placeholder="Search here" />
                    <button className="search-btn" onClick={searchBtn}>
                      Search
                    </button>
                  </form>
                </div>
              </div>
              {/* <!-- /SEARCH BAR --> */}

              {/* <!-- ACCOUNT --> */}
              <div className="col-md-3 clearfix">
                <div
                  className="header-ctn"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* <!-- Wishlist --> */}
                  {/* <div>
                    <a href="#">
                      <i className="fa fa-heart-o"></i>
                      <span>Your Wishlist</span>
                      <div className="qty">2</div>
                    </a>
                  </div> */}
                  {/* <!-- /Wishlist --> */}

                  {/* <!-- Cart --> */}
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <i className="fa fa-shopping-cart"></i>
                      <span>Your Cart</span>
                      <div className="qty">{carts?.length ||0}</div>
                    </a>
                    <div className="cart-dropdown">
                      <div className="cart-list">
                        {carts?.map((c, index) => {
                          return (
                            <div className="product-widget" key={index + 1}>
                              <div className="product-img">
                                <img src={`${base}/${c.image}` }alt="" /> 
                              </div>
                              <div className="product-body">
                                <h3 className="product-name">
                                  <a href="#">{c.product_name}</a>
                                </h3>
                                <h4 className="product-price">
                                  <span className="qty">
                                    {c.buyingQuantity}x
                                  </span>
                                  ${c.discounted}
                                </h4>
                              </div>
                              <button
                                onClick={() => removeFromCart(c)}
                                className="delete"
                              >
                                <i className="fa fa-close"></i>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="cart-summary">
                        <small>{carts?.length || 0} Item(s) selected</small>
                        {/* <h5>SUBTOTAL: $2940.00</h5> */}
                      </div>
                      <div className="cart-btns">
                        <a href="/carts">View Cart</a>
                        <a href="/checkout">
                          Checkout <i className="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Cart --> */}

                  {/* <!-- Menu Toogle --> */}
                  <div className="menu-toggle">
                    <button onClick={menuClick} className="menuBtn">
                      <i className="fa fa-bars"></i>
                      <span style={{ display: "block" }}>Menu</span>
                    </button>
                    {/* <a href="#">
                      <i className="fa fa-bars"></i>
                      <span>Menu</span>
                    </a> */}
                  </div>
                  {/* <!-- /Menu Toogle --> */}
                </div>
              </div>
              {/* <!-- /ACCOUNT --> */}
            </div>
            {/* <!-- row --> */}
          </div>
          {/* <!-- container --> */}
        </div>
        {/* <!-- /MAIN HEADER --> */}
      </header>

      <nav id="navigation">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- responsive-nav --> */}
          <div id="responsive-nav">
            {/* <!-- NAV --> */}
            <ul className="main-nav nav navbar-nav">
              <li className="active">
                <a href="/">Home</a>
              </li>
              {/* <li>
                <a href="#">Hot Deals</a>
              </li> */}
              <li>
                <a href="/store">Categories</a>
              </li>
              <li>
                <a href="/store">Laptops</a>
              </li>
              <li>
                <a href="/store">Smartphones</a>
              </li>
              <li>
                <a href="/store">Cameras</a>
              </li>
              <li>
                <a href="/store">Accessories</a>
              </li>
            </ul>
            {/* <!-- /NAV --> */}
          </div>
          {/* <!-- /responsive-nav --> */}
        </div>
        {/* <!-- /container --> */}
      </nav>
    </div>
  );
};

export default TopBar;
