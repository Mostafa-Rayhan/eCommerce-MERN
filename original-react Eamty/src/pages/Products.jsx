import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastError, ToastSuccess, base } from "../components/SmallCom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import AddToCartFunction from "../components/AddToCartFunction";
import Rating from '@mui/material/Rating';

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [refreshP, setRefreshP] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [allRating, setAllRating]=useState([])
  const [av, setAv]=useState(5)


  React.useEffect(() => {
    axios
      .get(`${base}/product/single/${id}`)
      .then(function (response) {
        console.log("re", response);
        setProduct(response.data);
        setAllRating(response.data.reviews)

      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  React.useEffect(() => {
 if(allRating){
  getAv(allRating)
 }
  }, [allRating]);

  console.log("product", product);
  console.log("rating", allRating);

  const addCArt = (pro) => {
    AddToCartFunction(pro);
  };

  const ratingVal = (e) => {
    e.preventDefault()
    setRatingValue(e.target.value);
  };

  const addReviewForm = (e) => {
    e.preventDefault();
    const t = e.target;
    const body = {
      rName: t.name.value,
      rEmail: t.email.value,
      rDesc: t.desc.value,
      rating:ratingValue
    };

  console.log("body", body,"r", ratingValue);

  axios
  .put(`${base}/product/rating/${product._id}`, body)
  .then(function (response) {
    // localStorage.setItem("bloodUserData", JSON.stringify(body));
    // setRefresh(!refresh);
    // navigate(from, { replace: true });
    // setPRefresh(!pRefresh)
    ToastSuccess("Successfully created")
    // setLoad(false)
    console.log(response?.data);
  })
  .catch(function (error) {
    console.log(error);
    // setLoad(false)
    ToastError(error?.message)
  });



  };

  const getAv=(r)=>{
    let all=0
    console.log();
    r.map(a=>{
      return all += Number(a.rating)
    })
    setAv(all /r.length)

  }

  console.log("av", av );
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <TopBar> </TopBar>
      <div id="breadcrumb" className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumb-tree">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/store">All Categories</a>
                </li>
                {/* <li>
                  <a href="#">Accessories</a>
                </li> */}
                {/* <li>
                  <a href="#">Headphones</a>
                </li> */}
                <li className="active">{product?.product_name}</li>
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
         { product ?
          <div className="row">
          {/* <!-- Product main img -->/ */}
          <div className="col-md-5 col-md-push-2">
            <div id="product-main-img">
              <div className="product-preview">
                <img src={`${base}/${product?.image}` } alt="" />
              </div>

              {/* <div className="product-preview">
                <img src={`${base}/${product?.files[0] || ""} ` } alt="" />
              </div>

              <div className="product-preview">
                <img src={`${base}/${product?.files[1] || ""} ` } alt="" />
              </div>

              <div className="product-preview">
                <img src={`${base}/${product?.files[2] || ""} ` } alt="" />
              </div> */} 
            </div>
          </div>
          {/* <!-- /Product main img --> */}

          {/* <!-- Product thumb imgs -->/ */}
          <div className="col-md-2  col-md-pull-5">
            <div id="product-imgs">
              <div className="product-preview">
                <img src={`${base}/${product.files[0]}` } alt="" />
              </div>

              <div className="product-preview">
                <img src={`${base}/${product.files[1]}` } alt="" />
              </div>

              <div className="product-preview">
                <img src={`${base}/${product.files[2]}` } alt="" />
              </div>

              {/* <div className="product-preview">
                <img src={product?.image} alt="" />
              </div> */}
            </div>
          </div>
          {/* <!-- /Product thumb imgs --> */}

          {/* <!-- Product details --> */}
          <div className="col-md-5">
            <div className="product-details">
              <h2 className="product-name">{product?.product_name}</h2>
              <div>
                <div className="product-rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <a className="review-link" href="#">
                  10 Review(s) | Add your review
                </a>
              </div>
              <div>
                <h3 className="product-price">
                  {product?.discounted}{" "}
                  <del className="product-old-price">{product?.price}</del>
                </h3>
                <span className="product-available">In Stock</span>
              </div>
              <p style={{ fontWeight: 700 }}>
                Total sold :{" "}
                <spans style={{ color: "#EF233C" }}>{product?.sold}</spans>
              </p>

              {/* <div className="product-options">
                <label>
                  Size
                  <select className="input-select">
                    <option value="0">X</option>
                  </select>
                </label>
                <label>
                  Color
                  <select className="input-select">
                    <option value="0">Red</option>
                  </select>
                </label>
              </div> */}

              <div className="add-to-cart " style={{ marginTop: "30px " }}>
                {/* <div className="qty-label">
                  Qty
                  <div className="input-number">
                    <input type="number" />
                    <span className="qty-up">+</span>
                    <span className="qty-down">-</span>
                  </div>
                </div> */}
                <button
                  onClick={() => addCArt(product)}
                  className="add-to-cart-btn"
                >
                  <i className="fa fa-shopping-cart"></i> add to cart
                </button>
              </div>

              <ul className="product-btns">
                {/* <li>
                  <a href="#">
                    <i className="fa fa-heart-o"></i> add to wishlist
                  </a>
                </li> */}
                {/* <li>
                  <a href="#">
                    <i className="fa fa-exchange"></i> add to compare
                  </a>
                </li> */}
              </ul>

              <ul className="product-links">
                <li>Category:</li>
                <li>
                  <a href="store">Headphones</a>
                </li>
                <li>
                  <a href="store">Accessories</a>
                </li>
              </ul>

              <ul className="product-links">
                <li>Share:</li>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- /Product details --> */}

          {/* <!-- Product tab --> */}
          <div className="col-md-12">
            <div id="product-tab">
              {/* <!-- product tab nav --> */}
              <ul className="tab-nav">
                <li className="active">
                  <a data-toggle="tab" href="#tab1">
                    Description
                  </a>
                </li>
                {/* <li>
                  <a data-toggle="tab" href="#tab2">
                    Details
                  </a>
                </li> */}
                <li>
                  <a data-toggle="tab" href="#tab3">
                    Reviews ({allRating?.length || 0})
                  </a>
                </li>
              </ul>
              {/* <!-- /product tab nav --> */}

              {/* <!-- product tab content --> */}
              <div className="tab-content">
                {/* <!-- tab1  --> */}
                <div id="tab1" className="tab-pane fade in active">
                  <div className="row">
                    <div className="col-md-12">
                      <p>{product?.description}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- /tab1  --> */}

                {/* <!-- tab2  --> */}
                <div id="tab2" className="tab-pane fade in">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- /tab2  --> */}

                {/* <!-- tab3  --> */}
                <div id="tab3" className="tab-pane fade in">
                  <div className="row">
                    {/* <!-- Rating --> */}
                    <div className="col-md-3">
                      <div id="rating">
                        <div className="rating-avg">
                          <span>{av}</span>
                          <div className="rating-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                          </div>
                        </div>
                        {/* <ul className="rating">
                          <li>
                            <div className="rating-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className="rating-progress">
                              <div style={{ width: "80%" }}></div>
                            </div>
                            <span className="sum">3</span>
                          </li>
                          <li>
                            <div className="rating-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                            <div className="rating-progress">
                              <div style={{ width: "60%" }}></div>
                            </div>
                            <span className="sum">2</span>
                          </li>
                          <li>
                            <div className="rating-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                            <div className="rating-progress">
                              <div></div>
                            </div>
                            <span className="sum">0</span>
                          </li>
                          <li>
                            <div className="rating-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                            <div className="rating-progress">
                              <div></div>
                            </div>
                            <span className="sum">0</span>
                          </li>
                          <li>
                            <div className="rating-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                            <div className="rating-progress">
                              <div></div>
                            </div>
                            <span className="sum">0</span>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    {/* <!-- /Rating --> */}

                    {/* <!-- Reviews --> */}
                    <div className="col-md-6">
                      <div id="reviews">
                        <ul className="reviews">
                          {allRating?.map(r=>{
                            return(
                              <li key={r?._id}>
                              <div className="review-heading">
                                <h5 className="name">{r?.rName}</h5>
                                {/* <p className="date">27 DEC 2018, 8:0 PM</p> */}
                                <div className="review-rating">
                                <Rating name="read-only" value={r?.rating} readOnly style={{color:"#D10024", fontSize:"16px "}} />
                                  {/* <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-o empty"></i> */}
                                </div>
                              </div>
                              <div className="review-body">
                                <p>
                                 {r?.rDesc}
                                </p>
                              </div>
                            </li>
                            )
                          })}

                        </ul>
                        {/* <ul className="reviews-pagination">
                          <li className="active">1</li>
                          <li>
                            <a href="#">2</a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li>
                            <a href="#">4</a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-angle-right"></i>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    {/* <!-- /Reviews --> */}

                    {/* <!-- Review Form --> */}
                    <div className="col-md-3">
                      <div id="review-form">
                        <form
                          className="review-form"
                          onSubmit={addReviewForm}
                        >
                          <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                          />
                          <input
                            className="input"
                            type="email"
                            placeholder="Your Email"
                            name="email"
                          />
                          <textarea
                            className="input"
                            placeholder="Your Review"
                            name="desc"
                          ></textarea>
                          <div className="input-rating">
                            <span>Your Rating: </span>
                            <div className="stars">
                              <input
                                id="star5"
                                name="rating"
                                value="5"
                                type="radio"
                                onChange={ratingVal}
                              />
                              <label for="star5"></label>
                              <input
                                id="star4"
                                name="rating"
                                value="4"
                                type="radio"
                                onChange={ratingVal}
                              />
                              <label for="star4"></label>
                              <input
                                id="star3"
                                name="rating"
                                value="3"
                                type="radio"
                                onChange={ratingVal}
                              />
                              <label for="star3"></label>
                              <input
                                id="star2"
                                name="rating"
                                value="2"
                                type="radio"
                                onChange={ratingVal}
                              />
                              <label for="star2"></label>
                              <input
                                id="star1"
                                name="rating"
                                value="1"
                                type="radio"
                                onChange={ratingVal}
                              />
                              <label for="star1"></label>
                            </div>
                          </div>
                          <button className="primary-btn">Submit</button>
                        </form>
                      </div>
                    </div>
                    {/* <!-- /Review Form --> */}
                  </div>
                </div>
                {/* <!-- /tab3  --> */}
              </div>
              {/* <!-- /product tab content  -->/ */}
            </div>
          </div>
          {/* <!-- /product tab --> */}
        </div>
        :" No information available"}
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}

      {/* <!-- Section --> */}
      <div className="section">
        {/* <!-- container -->/ */}
        <div className="container">
          {/* <!-- row --> */}

          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Products;
