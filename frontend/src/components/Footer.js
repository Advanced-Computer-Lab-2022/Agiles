import React from "react";
import a from "../static/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-content-right">
        <h3>Canadian Chamber of Commerce</h3>
        <p>
          Canadian Chamber of Commerce in Egypt (CanCham) was officially
          inaugurated on the 31st of May 2006. It was established in Egypt as a
          non-profit and non-governmental organization. It is an official member
          at the Canadian Chamber of Commerce in Canada; having access to their
          members database who mounts to 195,000. CanCham gives you and your
          company access to information and contacts.
        </p>
        </div>
        <div>
          <img
            src={a}
            width="auto"
            height="150px"
            alt="mainImage"
           
          ></img>
      </div>
      </div>
      
      <hr></hr>
      <div class="footer-bottom">
        <p>copyright &copy;2022 AgilesTeam </p>

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
