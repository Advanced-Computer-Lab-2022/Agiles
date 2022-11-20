import "./Home.css";
import { Link } from "react-router-dom";
import NavbarStyles from "../components/Navbar.module.css";
import React from "react";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
const cookies = new Cookies();
const Home = (props) => {
  const logged = props.logged;
  const status = cookies.get("status");
  if (logged) {
    if (status == 0) {
      return (
        <div className="home">
          <section className="main">
            <div>
              <h2>Welcome Back !</h2>
            </div>
            <img src={a} alt="mainImage" className="mainImage"></img>
          </section>
          <nav className={NavbarStyles["navbar"]}>
            <div className={NavbarStyles["links"]}>
              <Link to="/courses">Explore</Link>
              <Link to="/login">In progress</Link>
              <Link to="/signup">Completed</Link>
            </div>
          </nav>
          <footer></footer>
        </div>
      );
    } else {
      return (
        <div className="home">
          <section className="main">
            <div>
              <h2>Welcome Back !</h2>
            </div>
            <img src={a} alt="mainImage" className="mainImage"></img>
          </section>
          <nav className={NavbarStyles["navbar"]}>
            <div className={NavbarStyles["links"]}>
              <Link to="/instructorOwnCourses">My courses</Link>
              <Link to="/instructorCreateCourse">Create Course</Link>
              <Link to="/instructor/instructorViewProfile">View/Edit Profile</Link>
            </div>
          </nav>
          <footer></footer>
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <section className="main">
          <div>
            <h2>Register now !</h2>
          </div>
          <img src={a} alt="mainImage" className="mainImage"></img>
        </section>
        <nav className={NavbarStyles["navbar"]}>
          <div className={NavbarStyles["links"]}>
            <Link to="/courses">Explore</Link>
          </div>
        </nav>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
