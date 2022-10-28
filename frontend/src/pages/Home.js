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
          <button className="guestButtons">view all courses</button>
        </Link>
        
<Link to="/coursesPrices">
<button className="guestButtons">View the price of each course</button>
</Link>
      </div>
      

      {/* <Link to="/instructor">
        <button>Instructor (Azooz)</button>
      </Link>
      <Link to="/itrainee">
        <button> I Trainee (Abdullah)</button>
      </Link>
      <Link to="/ctrainee">
        <button>C Trainee (Adham)</button>
      </Link>
      <Link to="/guest">
        <button>Guest (Yahia)</button>
  </Link>*/}
    </div>
  );
};

export default Home;
