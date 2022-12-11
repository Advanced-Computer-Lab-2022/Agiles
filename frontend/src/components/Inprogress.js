import Cookies from "universal-cookie";
import axios from "axios";
import unAuth from "../clearAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarStyles from "../components/Navbar.module.css";
import RegCourseCardStyles from "./RegCourseCard.module.css";
import CourseStyles from "../pages/Course/Courses.module.css";
import LoadingScreen from "react-loading-screen";
import InprogressStyles from "./Inprogress.module.css"
import spinner from "../static/download.gif";
import RegCourseCard from "./RegCourseCard";

const cookies = new Cookies();
const INPROGRESS_URL = "/individualtrainee/inprogress";
const Inprogress = () => {
  const currentUser = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const token = cookies.get("jwt");
  let result = [];
  const getCourses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(INPROGRESS_URL + "/" + currentUser);
      result = res.data.registered_courses
      setCourses(result);
      setIsLoading(false);
    } catch (err) {
       if (err.response?.status == 401){
          unAuth();
       }
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className={CourseStyles["course"]}>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div>
        <section className="mainSection">
            <h2>Welcome Back !</h2>
          </section>

      <nav className={NavbarStyles["navbar"]}>
            <div>
              <Link to ="/"><button  className={"notPressed" }>Explore</button></Link>
              <Link to ="/mylearning"><button className={"Inprogress"}> My Learning</button></Link>
            </div>
          </nav>

        <section className={InprogressStyles["Wrapper"]}>
         
          <div className={RegCourseCardStyles["cardgrid"]}>
            {courses.map((el, index) => {
              return <RegCourseCard  data={el.courseId} progress={el.progress} courseRating = {el.courseRating?el.courseRating.userRating:0}index={index} key={index} />;
            })}
          </div> 
        </section>
        </div>
      )}
    </div>
  );
};

export default Inprogress;
