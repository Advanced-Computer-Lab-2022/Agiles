import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <h1> Welcome to Home</h1>
      <Link to="/admin">
        <button> Admin (Hossam)</button>
      </Link>
      <Link to="/instructor">
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
      </Link>
    </div>
  );
};

export default Home;
