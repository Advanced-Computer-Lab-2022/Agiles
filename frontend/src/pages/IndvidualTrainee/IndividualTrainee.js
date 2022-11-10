import "../Home.css";
import { Link } from "react-router-dom";
import a from "../../static/a.png";
function IndividualTrainee() {
  return (
    <div className="home">
        <div className="firstLine">
      <img src={a} alt="mainImage" className="mainImage"></img>
      <h1> Welcome Ahmed!</h1>
      <div className="guestContainer">
        <Link to="/courses">
          <button className="guestButtons">Explore courses</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default IndividualTrainee;
