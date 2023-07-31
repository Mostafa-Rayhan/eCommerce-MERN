import React from 'react';

const Footer = () => {
    return (
        <div>
             <div id="newsletter" className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <div className="newsletter">
                <p>
                  Sign Up for the <strong>NEWSLETTER</strong>
                </p>
                <form >
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  <button className="newsletter-btn">
                    <i className="fa fa-envelope"></i> Subscribe
                  </button>
                </form>
                <ul className="newsletter-follow">
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
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>

      {/* footer  */}

      <footer id="footer">
			{/* <!-- top footer --> */}
			<div className="section">
				{/* <!-- container --> */}
				<div className="container">
					{/* <!-- row --> */}
					<div className="row">
						<div className="col-md-4 col-xs-6">
							<div className="footer">
								<h3 className="footer-title">About Us</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
								<ul className="footer-links">
									<li><a href="#"><i className="fa fa-map-marker"></i>1734 Stonecoal Road</a></li>
									<li><a href="#"><i className="fa fa-phone"></i>+021-95-51-84</a></li>
									<li><a href="#"><i className="fa fa-envelope-o"></i>email@email.com</a></li>
								</ul>
							</div>
						</div>

						<div className="col-md-4 col-xs-6">
							<div className="footer">
								<h3 className="footer-title">Categories</h3>
								<ul className="footer-links">
									<li><a href="store">Hot deals</a></li> 
									<li><a href="store">Laptops</a></li>
									<li><a href="store">Smartphones</a></li>
									<li><a href="store">Cameras</a></li>
									<li><a href="store">Accessories</a></li>
								</ul>
							</div>
						</div>

						<div className="clearfix visible-xs"></div>

						{/* <div className="col-md-3 col-xs-6">
							<div className="footer">
								<h3 className="footer-title">Information</h3>
								<ul className="footer-links">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Orders and Returns</a></li>
									<li><a href="#">Terms & Conditions</a></li>
								</ul>
							</div>
						</div> */}

						<div className="col-md-4 col-xs-6">
							<div className="footer">
								<h3 className="footer-title">Service</h3>
								<ul className="footer-links">
									<li><a href="admin">My Account</a></li>
									<li><a href="carts">View Cart</a></li>
									{/* <li><a href="#">Wishlist</a></li> */}
									{/* <li><a href="#">Track My Order</a></li> */}
									{/* <li><a href="#">Help</a></li> */}
								</ul>
							</div>
						</div>
					</div>
					{/* <!-- /row --> */}
				</div>
				{/* <!-- /container --> */}
			</div>
			{/* <!-- /top footer --> */}

			{/* <!-- bottom footer --> */}
			<div id="bottom-footer" className="section">
				<div className="container">
					{/* <!-- row --> */}
					<div className="row">
						<div className="col-md-12 text-center">
							<ul className="footer-payments">
								<li><a href="#"><i className="fa fa-cc-visa"></i></a></li>
								<li><a href="#"><i className="fa fa-credit-card"></i></a></li>
								<li><a href="#"><i className="fa fa-cc-paypal"></i></a></li>
								<li><a href="#"><i className="fa fa-cc-mastercard"></i></a></li>
								<li><a href="#"><i className="fa fa-cc-discover"></i></a></li>
								<li><a href="#"><i className="fa fa-cc-amex"></i></a></li>
							</ul>
							<span className="copyright">
								{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
								Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
							{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
							</span>
						</div>
					</div>
						{/* <!-- /row --> */}
				</div>
				{/* <!-- /container --> */}
			</div>
			{/* <!-- /bottom footer --> */}
		</footer>

        </div>
    );
};

export default Footer;
