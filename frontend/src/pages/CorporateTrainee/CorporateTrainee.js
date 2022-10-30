import React from "react";
import CorporateTraineeStyles from "./CorporateTrainee.module.css";
import { Link } from "react-router-dom";
import a from "../../static/a.png";

function CorporateTrainee() {
  return (
    <div className="home">
      <h1> Welcome Ahmed!</h1>
      <img src={a} alt="mainImage" className="mainImage"></img>
      <div className="guestContainer">
        <Link to="/ccourses">
          <button className="guestButtons">Explore courses</button>
        </Link>
      </div>
    </div>
  );
}

export default CorporateTrainee;
