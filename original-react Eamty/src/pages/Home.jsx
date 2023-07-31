import React, { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { base } from "../components/SmallCom";
import shop1 from "../assets/img/shop01.png"
import shop2 from "../assets/img/shop02.png"
import shop3 from "../assets/img/shop03.png"
import { useNavigate } from "react-router-dom";
import AddToCartFunction from "../components/AddToCartFunction";
import { AppContext } from "../app.context";
// import { AddToCartFunction } from "../components/AddToCartFunction";

const Home = () => {

  const [products, setProducts] = React.useState([]);
  const [refreshP, setRefreshP] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData]=React.useState()
  const [loadingState, setLoadingState]=React.useState(false)
  const navigate=useNavigate()
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);
  const [catFilter, setCatFilter]=useState([])
  const [defaultCat, setDefaultCat]=useState('laptop')
  const { refresh, setRefresh, carts, setCarts } =useContext(AppContext);

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

  React.useEffect(() => {
   const filtered=products?.filter(p=>p.category==defaultCat)
   setCatFilter(filtered)
  }, [products, defaultCat]);




  console.log("product", products);

  const navigateToDetails=(id)=>{
    navigate(`/${id}`)
   }

  const addToCart =(p)=>{
   AddToCartFunction(p)
   setRefresh(!refresh)

  }
  console.log("cartss", carts);


  return (
    <div>
      <TopBar></TopBar>
      <Navbar></Navbar>

      {/* other sections  */}

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {/* <!-- shop --> */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src={shop1} alt="" />
                </div>
                <div className="shop-body">
                  <h3>
                    Laptop
                    <br />
                    Collection
                  </h3>
                  <a href="store" className="cta-btn">
                    Shop now <i className="fa fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- /shop --> */}

            {/* <!-- shop --> */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src={shop3} alt="" />
                </div>
                <div className="shop-body">
                  <h3>
                    Accessories
                    <br />
                    Collection
                  </h3>
                  <a href="store" className="cta-btn">
                    Shop now <i className="fa fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- /shop --> */}

            {/* <!-- shop --> */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src={shop2} alt="" />
                </div>
                <div className="shop-body">
                  <h3>
                    Cameras
                    <br />
                    Collection
                  </h3>
                  <a href="store" className="cta-btn">
                    Shop now <i className="fa fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- /shop --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {/* <!-- section title --> */}
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="title">New Products</h3>
                <div className="section-nav">
                  <ul className="section-tab-nav tab-nav">
                    <li className="active">
                      <a data-toggle="tab" href="#tab1" onClick={()=>setDefaultCat("laptop")}>
                        Laptops
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab1" onClick={()=>setDefaultCat("smartphone")}>
                        Smartphones
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab1" onClick={()=>setDefaultCat("camera")}>
                        Cameras
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab1" onClick={()=>setDefaultCat("accessory")}>
                        Accessories
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- /section title --> */}

            {/* <!-- Products tab & slick --> */}
            <div className="col-md-12">
              <div className="row">
                <div className="products-tabs  ">
                  {/* <!-- tab --> */}
                  <div id="tab1" className="tab-pane active  ">
                    <div className="products-slick productRow" data-nav="#slick-nav-1">
                      {/* <!-- product --> */}

                      {
                        catFilter?.slice(0, 6)?.map(p=>{
                          return(
                            <div className="product">
                            <div className="product-img" onClick={()=>navigateToDetails(p._id)} style={{cursor:"pointer"}}>
                              <img src={`${base}/${p.image}` } alt="" />
                              <div className="product-label">
                                <span className="sale">-30%</span>
                                <span className="new">NEW</span>
                              </div>
                            </div>
                            <div className="product-body">
                              <p className="product-category">{p.category}</p>
                              <h3 className="product-name">
                                <a href={`/${p._id}`}>{p.product_name}</a>
                              </h3>
                              <h4 className="product-price">
                                {p.discounted}{" "}
                                <del className="product-old-price">{p.price}</del>
                              </h4>
                              <div className="product-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                              {/* <div className="product-btns">
                                <button className="add-to-wishlist">
                                  <i className="fa fa-heart-o"></i>
                                  <span className="tooltipp">add to wishlist</span>
                                </button>
                                <button className="add-to-compare">
                                  <i className="fa fa-exchange"></i>
                                  <span className="tooltipp">add to compare</span>
                                </button>
                                <button className="quick-view">
                                  <i className="fa fa-eye"></i>
                                  <span className="tooltipp">quick view</span>
                                </button>
                              </div> */}
                            </div>
                            <div className="add-to-cart">
                              <button className="add-to-cart-btn" onClick={()=>addToCart(p)} >
                                <i className="fa fa-shopping-cart"></i> add to cart
                              </button>
                            </div>
                          </div>
                          )
                        })
                      }

                      {/* <!-- /product --> */}
                    </div>
                    <div id="slick-nav-1" className="products-slick-nav"></div>
                  </div>
                  {/* <!-- /tab --> */}
                </div>
              </div>
            </div>
            {/* <!-- Products tab & slick --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}

      {/* <!-- HOT DEAL SECTION --> */}
      <div id="hot-deal" className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <div className="hot-deal">
                <ul className="hot-deal-countdown">
                  <li>
                    <div>
                      <h3>02</h3>
                      <span>Days</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>10</h3>
                      <span>Hours</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>34</h3>
                      <span>Mins</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>60</h3>
                      <span>Secs</span>
                    </div>
                  </li>
                </ul>
                <h2 className="text-uppercase">hot deal this week</h2>
                <p>New Collection Up to 50% OFF</p>
                <a className="primary-btn cta-btn" href="store">
                  Shop now
                </a>
              </div>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /HOT DEAL SECTION --> */}

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {/* <!-- section title --> */}
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="title">Top selling</h3>
                <div className="section-nav">
                  <ul className="section-tab-nav tab-nav">
                    <li className="active">
                      <a data-toggle="tab" href="#tab2">
                        Laptops
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab2">
                        Smartphones
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab2">
                        Cameras
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab2">
                        Accessories
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- /section title --> */}

            {/* <!-- Products tab & slick --> */}
            <div className="col-md-12">
              <div className="row">
                <div className="products-tabs">
                  {/* <!-- tab --> */}
                  <div id="tab2" className="tab-pane fade in active">
                    <div className="products-slick productRow " data-nav="#slick-nav-2">
                      {/* <!-- product --> */}

                      {products.slice(0, 6)?.map(p=>{
                        return (
                          <div className="product">
                          <div className="product-img" onClick={()=>navigateToDetails(p._id)} style={{cursor:"pointer"}}>
                            <img src={`${base}/${p.image}`} alt="" />
                            <div className="product-label">
                              <span className="sale">-30%</span>
                              <span className="new">NEW</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">{p.category}</p>
                            <h3 className="product-name">
                              <a href={`/${p._id}`}>{p.product_name}</a>
                            </h3>
                            <h4 className="product-price">
                              {p.discounted}{" "}
                              <del className="product-old-price">{p.price}</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            {/* <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o"></i>
                                <span className="tooltipp">add to wishlist</span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange"></i>
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye"></i>
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div> */}
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn" onClick={()=>addToCart(p)} >
                              <i className="fa fa-shopping-cart"></i> add to cart
                            </button>
                          </div>
                        </div>

                        )
                      })
                      }

                      {/* <!-- /product --> */}


                    </div>
                    <div id="slick-nav-2" className="products-slick-nav"></div>
                  </div>
                  {/* <!-- /tab --> */}
                </div>
              </div>
            </div>
            {/* <!-- /Products tab & slick --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}

          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}


      <Footer></Footer>
    </div>
  );
};

export default Home;
