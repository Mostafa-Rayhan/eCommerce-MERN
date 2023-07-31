<div className="row">
            <div className="col-md-4 col-xs-6">
              <div className="section-title">
                <h4 className="title">Top selling</h4>
                <div className="section-nav">
                  <div id="slick-nav-3" className="products-slick-nav"></div>
                </div>
              </div>

              <div className="products-widget-slick" data-nav="#slick-nav-3">
                <div>
                  {/* <!-- product widget --> */}
                  {
                    products.slice(0, 6)?.map(p=>{
                      return (
                        <div className="product-widget">
                        <div className="product-img">
                          <img src={p.image} alt="" />
                        </div>
                        <div className="product-body">
                          <p className="product-category">{p.category}</p>
                          <h3 className="product-name">
                            <a href={`/${p._id}`}>{p.product_name}</a>
                          </h3>
                          <h4 className="product-price">
                            {p.discounted} <del className="product-old-price">{p.price}</del>
                          </h4>
                        </div>
                      </div>
                      )
                    })
                  }

                  {/* <!-- /product widget --> */}



                </div>
              </div>
            </div>

            <div className="col-md-4 col-xs-6">
              <div className="section-title">
                <h4 className="title">Top selling</h4>
                <div className="section-nav">
                  <div id="slick-nav-4" className="products-slick-nav"></div>
                </div>
              </div>

              <div className="products-widget-slick" data-nav="#slick-nav-4">
                <div>
                  {/* <!-- product widget --> */}
                 {
                  products.slice(0, 6)?.map(p=>{
                    return (
                      <div className="product-widget">
                      <div className="product-img">
                        <img src={p.image} alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">{p.category}</p>
                        <h3 className="product-name">
                          <a href={`/${p._id}`}>{p.product_name}</a>
                        </h3>
                        <h4 className="product-price">
                          {p.discounted}<del className="product-old-price">{p.price}</del>
                        </h4>
                      </div>
                    </div>
                    )
                  })
                 }



                  {/* <!-- product widget --> */}
                </div>
              </div>
            </div>

            <div className="clearfix visible-sm visible-xs"></div>

            <div className="col-md-4 col-xs-6">
              <div className="section-title">
                <h4 className="title">Top selling</h4>
                <div className="section-nav">
                  <div id="slick-nav-5" className="products-slick-nav"></div>
                </div>
              </div>

              <div className="products-widget-slick" data-nav="#slick-nav-5">
                <div>


                  {
                    products.slice(0, 6)?.map(p=>{
                      return (
                        <div className="product-widget">
                        <div className="product-img">
                          <img src={p.image} alt="" />
                        </div>
                        <div className="product-body">
                          <p className="product-category">{p.category}</p>
                          <h3 className="product-name">
                            <a href={`/${p._id}`}>{p.product_name}</a>
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
              </div>
            </div>
          </div>
