import "./Home.css";
import { Link } from "react-router-dom";
import a from "../static/a.png";

const Home = () => {
  return (
    <div className="home">
      <h1> Welcome !</h1>
      <img src={a} alt="mainImage" className="mainImage"></img>
      <div className="guestContainer">
        <Link to="/courses">
          <button className="guestButtons">Explore courses</button>
        </Link>

        <Link to="/coursesPrices">
          <button className="guestButtons">
            View the price of each course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
