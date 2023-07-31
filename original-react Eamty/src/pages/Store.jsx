import React, { useContext, useState } from "react";
import axios from "axios";
import { base } from "../components/SmallCom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddToCartFunction from "../components/AddToCartFunction";
import { AppContext } from "../app.context";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const Store = () => {
  const { refresh, setRefresh, carts, setCarts } =useContext(AppContext);
  const [products, setProducts] = React.useState([]);
  const [refreshP, setRefreshP] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState();
  const [loadingState, setLoadingState] = React.useState(false);
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brandF, setBrandF]=useState([])
  const [catF, setCatF]=useState([])
  const [filtered, setFiltered]=useState([])
  const [noProduct, setNoProduct]=useState("")
  const navigate=useNavigate()

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
    axios
      .get(`${base}/product`)
      .then(function (response) {
        // console.log("re", response)
        setProducts(response.data);
		setFiltered(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshP]);
  React.useEffect(() => {

	const filteredArray = products.filter((item) => {
		const isBrandMatch = brandF.length === 0 || brandF.includes(item.brand);
		const isCategoryMatch = catF.length === 0 || catF.includes(item.category);
		return isBrandMatch && isCategoryMatch;
	  });

	// const filteredArray = products?.filter((item) => {
	// 	return brandF.includes(item.brand) && catF.includes(item.category);
	//   });
	  setFiltered(filteredArray)

  }, [brandF, catF, products]);
  React.useEffect(() => {
if(filtered.length>0){
	setNoProduct("")
}
else{
	setNoProduct("Sorry no product found")
}

  }, [filtered.length]);

  const catChange=( e)=>{
const val=e.target.value
console.log(e.target.checked);

if(e.target.checked==true){
	setCatF([...catF,val ])
}
else{
	const updatedArray = catF.filter((element) => element !== val);
	setCatF(updatedArray)
}


  }

  const brandChange=(e)=>{

	const val=e.target.value

if(e.target.checked==true){
	setBrandF([...brandF,val ])
}
else{
	const updatedArray = brandF.filter((element) => element !== val);
	setBrandF(updatedArray)
}

  }

  const addToCart =(p)=>{
    AddToCartFunction(p)
    setRefresh(!refresh)

   }
   const navigateToDetails=(id)=>{
    navigate(`/${id}`)
   }

  console.log("pr", filtered );
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
                  <a href="#">All Categories</a>
                </li>
                {/* <li><a href="#">Accessories</a></li>
							<li className="active">Headphones (227,490 Results)</li> */}
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
            {/* <!-- ASIDE --> */}
            <div id="aside" className="col-md-3">
              {/* <!-- aside Widget --> */}
              <div className="aside">
                <h3 className="aside-title">Categories</h3>
                <div className="checkbox-filter">
                  {cat?.map((c,index) => {
                    return (
                      <div className="input-checkbox">
                        <input type="checkbox" id={`category-${index+1}`} onChange={catChange} value={c.name} />
                        <label for={`category-${index+1}`}>
                          <span></span>
                          {c.name}
                          {/* <small>(120)</small> */}
                        </label>
                      </div>
                    );
                  })}


                </div>
              </div>
              {/* <!-- /aside Widget --> */}

              {/* <!-- aside Widget --> */}
              {/* <div className="aside">
                <h3 className="aside-title">Price</h3>
                <div className="price-filter">
                  <div id="price-slider"></div>
                  <div className="input-number price-min">
                    <input id="price-min" type="number" />
                    <span className="qty-up">+</span>
                    <span className="qty-down">-</span>
                  </div>
                  <span>-</span>
                  <div className="input-number price-max">
                    <input id="price-max" type="number" />
                    <span className="qty-up">+</span>
                    <span className="qty-down">-</span>
                  </div>
                </div>
              </div> */}
              {/* <!-- /aside Widget --> */}

              {/* <!-- aside Widget --> */}
              <div className="aside">
                <h3 className="aside-title">Brand</h3>
                <div className="checkbox-filter">

				{brand?.map((c,index) => {
                    return (
                      <div className="input-checkbox">
                        <input type="checkbox" id={`brand-${index+1}`} onChange={brandChange} value={c.name} />
                        <label for={`brand-${index+1}`}>
                          <span></span>
                          {c.name}
                          {/* <small>(120)</small> */}
                        </label>
                      </div>
                    );
                  })}


                </div>
              </div>
              {/* <!-- /aside Widget --> */}

              {/* <!-- aside Widget --> */}
              <div className="aside">
                <h3 className="aside-title">Top selling</h3>

				{
                    products.slice(0, 3)?.map(p=>{
                      return (
                        <div className="product-widget" onClick={()=>navigateToDetails(p._id)} style={{cursor:"pointer"}} >
                        <div className="product-img">
                          <img src={`${base}/${p.image}` } alt="" />
                        </div>
                        <div className="product-body">
                          <p className="product-category">{p.category}</p>
                          <h3 className="product-name">
                            <a href="#">{p.product_name}</a>
                          </h3>
                          <h4 className="product-price">
                            {p.discounted} <del className="product-old-price">{p.price}</del>
                          </h4>
                        </div>
                      </div>
                      )
                    })
                  }


              </div>
              {/* <!-- /aside Widget --> */}
            </div>
            {/* <!-- /ASIDE --> */}

            {/* <!-- STORE --> */}
            <div id="store" className="col-md-9">
              {/* <!-- store top filter --> */}
              {/* <div className="store-filter clearfix">
                <div className="store-sort">
                  <label>
                    Sort By:
                    <select className="input-select">
                      <option value="0">Popular</option>
                      <option value="1">Position</option>
                    </select>
                  </label>

                  <label>
                    Show:
                    <select className="input-select">
                      <option value="0">20</option>
                      <option value="1">50</option>
                    </select>
                  </label>
                </div>
                <ul className="store-grid">
                  <li className="active">
                    <i className="fa fa-th"></i>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-th-list"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
              {/* <!-- /store top filter --> */}

              {/* <!-- store products --> */}
              <div className="row">
                {/* <!-- product --> */}
                {filtered?.map((p) => {
                  return (
                    <div className="col-md-4 col-xs-6">
                      <div className="product"  >
                        <div className="product-img" onClick={()=>navigateToDetails(p._id)} style={{cursor:"pointer"}} >
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
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div> */}
                        </div>
                        <div className="add-to-cart">
                          <button className="add-to-cart-btn" onClick={()=>addToCart(p)} >
                            <i className="fa fa-shopping-cart"></i> add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
				<h4>{noProduct}</h4>
                {/* <!-- /product --> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product02.png" alt=""/>
										<div className="product-label">
											<span className="new">NEW</span>
										</div>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star-o"></i>
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div>
							{/* <!-- /product --> */}

                {/* <div className="clearfix visible-sm visible-xs"></div> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product03.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product --> */}

                {/* <div className="clearfix visible-lg visible-md"></div> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product04.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product --> */}

                {/* <div className="clearfix visible-sm visible-xs"></div> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product05.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product --> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product06.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star-o"></i>
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product --> */}

                {/* <div className="clearfix visible-lg visible-md visible-sm visible-xs"></div> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product07.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product -->/ */}

                {/* <!-- product -->/ */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product08.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product -->/ */}

                {/* <div className="clearfix visible-sm visible-xs"></div> */}

                {/* <!-- product --> */}
                {/* <div className="col-md-4 col-xs-6">
								<div className="product">
									<div className="product-img">
										<img src="./img/product09.png" alt=""/>
									</div>
									<div className="product-body">
										<p className="product-category">Category</p>
										<h3 className="product-name"><a href="#">product name goes here</a></h3>
										<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
										<div className="product-rating">
										</div>
										<div className="product-btns">
											<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
											<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
											<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
										</div>
									</div>
									<div className="add-to-cart">
										<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div> */}
                {/* <!-- /product --> */}
              </div>
              {/* <!-- /store products --> */}

              {/* <!-- store bottom filter --> */}
              {/* <div className="store-filter clearfix">
                <span className="store-qty">Showing 20-100 products</span>
                <ul className="store-pagination">
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
                </ul>
              </div> */}
              {/* <!-- /store bottom filter --> */}
            </div>
            {/* <!-- /STORE --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
	  <Footer></Footer>
    </div>
  );
};

export default Store;
