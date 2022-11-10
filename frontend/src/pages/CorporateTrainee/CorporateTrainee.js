import React from "react";
import CorporateTraineeStyles from "./CorporateTrainee.module.css";
import { Link } from "react-router-dom";
import a from "../../static/a.png";

function CorporateTrainee() {
  return (
    <div className="home">
      <div className="firstLine">
      <img src={a} alt="mainImage" className="mainImage"></img>
      <h1> Welcome Hossam!</h1>
      <div className="guestContainer">
        <Link to="/ccourses">
          <button className="guestButtons">Explore courses</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default CorporateTrainee;
