import "./Home.css";
import Button from "react-bootstrap/Button";
import NavbarStyles from "../components/Navbar.module.css";
import React from "react";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
import { useNavigate,Link } from "react-router-dom";
import Explore from "../components/Explore";
const cookies = new Cookies();
const Home = () => {
  const navigate = useNavigate();
  const logged = cookies.get("logged");
  const status = cookies.get("status");
  const handleClick = () => {
    navigate("/signUp");
  };
  if (logged) {
    // status 0 > Itrainee status 1 > Instructor status 3 > Ctrainee
    if (status == 0 || status == 2) {
      return (
        <div className="home">
          <section className="mainSection">
            <h2>Welcome Back !</h2>
            <img src={a} alt="canidan chamber of commerce" className="mainImage"></img>
          </section>
          <nav className={NavbarStyles["navbar"]}>
            <div>
              <Link to ="/"><button  className={"Inprogress" }>Explore</button></Link>
              <Link to ="/mylearning"><button className={"notPressed"}> My Learning</button></Link>
            </div>
          </nav>
          <Explore></Explore>
          <footer></footer>
        </div>
      );
    } else {
      return (
        <div className="home">
          <section className="mainSection">
            <div>
              <h2>Welcome Back !</h2>
            </div>
            <img src={a} alt="canidan chamber of commerce" className="mainImage"></img>
          </section>
          <nav className={NavbarStyles["navbar"]}>
            <div>
              <Link to ="/"><button className={"Inprogress" } >Explore </button></Link>
              <Link to = "/mycourses"><button className={"notPressed"} >My Courses </button></Link>
              <Link to = "/createcourse"><button className={"notPressed"}>CreateCourse </button></Link>
            </div>
          </nav>
        <Explore></Explore>
          <footer></footer>
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <section className="mainSection">
          <div>
            <Button variant="light" onClick={handleClick}>
              Register now
            </Button>
          </div>
          <img src={a} alt="canidan chamber of commerce" className="mainImage"></img>
        </section>
        <nav className={NavbarStyles["navbar"]}>
          <button className="Inprogress">Explore</button>
        </nav>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
