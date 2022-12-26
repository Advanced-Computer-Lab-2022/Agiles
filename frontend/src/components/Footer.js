import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Canadian Chamber of Commerce</h3>
        <p>I will write description here</p>
      </div>
      <hr></hr>
      <div class="footer-bottom">
      <p>copyright &copy;2022 Canadian Chamber of Commerce </p>
      </div>
      {/* <p className="footer-title">Copyrights 	&copy; <span>Canadian Chamber of Commerce</span></p>
      <div className="social-icons">
          <Link to="https://www.linkedin.com/in/hosam-elfar-152a541b3/"><i class="fab fa-linkedin"></i></Link>
          <Link to="https://github.com/Terror-1"><i class="fab fa-github"></i></Link>
          <Link to="https://www.facebook.com/hosam.far.3/"><i class="fab fa-facebook"></i></Link>
          <Link to="https://twitter.com/HosamELfar4"><i class="fab fa-twitter"></i></Link>
      </div> */}
    </footer>
  );
}

export default Footer;
