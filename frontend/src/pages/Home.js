import "./Home.css";
import Button from 'react-bootstrap/Button';
import NavbarStyles from "../components/Navbar.module.css";
import React from "react";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inprogress from "../components/Inprogress";
import Explore from "../components/Explore";
import InstructorOwnCourses from "./Instructor/InstructorOwnCourses";
import CreateCourse from "./Course/CreateCourse";
import InstructorProfile from "./Instructor/InstructorProfile";
const cookies = new Cookies();
const Home = () => {
  const logged = cookies.get("logged");
  const navigate = useNavigate();
  const status = cookies.get("status");
  const [choice, setChoice] = useState(0);
  const [chosen, setChosen] = useState(3);
  const handleClick = ()=>{
    navigate("/signUp");
  }
  const project = () => {
    switch (chosen) {
      case 0:
        return <InstructorOwnCourses />;
      case 1:
        return <CreateCourse />;
      case 2:
        return <InstructorProfile />;
        case 3:
        return <Explore />;
      default:
        return <h1>error</h1>;
    }
  };
  const project1 = () => {
    switch (choice) {
      case 0:
        return <Explore />;
      case 1:
        return <Inprogress />;
      default:
        return <h1>error</h1>;
    }
  };
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
            <div >
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
                My Learning
              </button>
            </div>
          </nav>
          {/*middle*/}
          <div className="middle">{project1()}</div>

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
            <div>
            <button
                onClick={() => setChosen(3)}
                className={chosen == 3 ? "Inprogress" : "notPressed"}
              >
                Explore
              </button>
            <button
                onClick={() => setChosen(0)}
                className={chosen == 0 ? "Inprogress" : "notPressed"}
              >
                My Courses
              </button>
              <button
                onClick={() => setChosen(1)}
                className={chosen == 1 ? "Inprogress" : "notPressed"}
              >
                CreateCourse
              </button>
              <button
                onClick={() => setChosen(2)}
                className={chosen == 2 ? "Inprogress" : "notPressed"}
              >
                My Profile
              </button>
             
            </div>
          </nav>
          <div className="middle">{project()}</div>
          <footer></footer>
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <section className="mainSection">
          <div>
          <Button variant="light" onClick={handleClick}>Register now</Button>
          </div>
          <img src={a} alt="mainImage" className="mainImage"></img>
        </section>
        <nav className={NavbarStyles["navbar"]}>
        <button className="Inprogress"   >
                Explore
              </button>
        </nav>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
