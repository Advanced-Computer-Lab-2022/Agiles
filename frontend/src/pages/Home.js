import "./Home.css";
import { Link } from "react-router-dom";
import NavbarStyles from "../components/Navbar.module.css";
import React from "react";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
import { useState } from "react";
import Inprogress from "../components/Inprogress";
import Explore from "../components/Explore";
const cookies = new Cookies();
const Home = () => {
  const logged = cookies.get("logged");
  const status = cookies.get("status");
  const [choice, setChoice] = useState(0);
  if (logged) {
    // status 0 > Itrainee
    // status 1 > Instructor
    // status 3 > Ctrainee
    if (status == 0 || status == 2) {
      return (
        <div className="home">
          <section className="mainSection">
         
              <h2>Welcome Back !</h2>
        
            <img src={a} alt="mainImage" className="mainImage"></img>
          </section>
          {/*sub nav*/}


          <nav className={NavbarStyles["navbar"]}>
            <div className={NavbarStyles["links"]}>
              <button
                onClick={() => setChoice(0)}
                className={choice == 0 ? "Inprogress" : "notPressed"}
              >
                Explore
              </button>
              <button
                onClick={() => setChoice(1)}
                className={choice == 1 ? "Inprogress" : "notPressed"}
              >
                Registered Courses
              </button>
              <Link to="/trainee/traineeViewProfile">My Profile</Link>
            </div>
          </nav>
          {/*middle*/}
          {choice==1?<Inprogress/>:<Explore/>}
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
            <img src={a} alt="mainImage" className="mainImage"></img>
          </section>
          <nav className={NavbarStyles["navbar"]}>
            <div className={NavbarStyles["links"]}>
              <Link to="/instructorOwnCourses">My courses</Link>
              <Link to="/instructorCreateCourse">Create Course</Link>
              <Link to="/instructor/instructorViewProfile">
                View/Edit Profile
              </Link>
            </div>
          </nav>
          <footer></footer>
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <section className="mainSection">
          <div>
            <h2>
              <a href="/signUp">Register now !</a>
            </h2>
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
