import "./Home.css";
import { Link } from "react-router-dom";
import NavbarStyles from "../components/Navbar.module.css";
import React from "react";
import a from "../static/logo.png";
const Home = (props) => {
  const logged = props.logged;
  if (logged) {
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
