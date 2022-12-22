import Cookies from "universal-cookie";
import axios from "axios";
import unAuth from "../clearAuth";
import { useEffect, useState } from "react";
import RegCourseCardStyles from "./RegCourseCard.module.css";
import CourseStyles from "../pages/Course/Courses.module.css";
import LoadingScreen from "react-loading-screen";
import InprogressStyles from "./Inprogress.module.css"
import spinner from "../static/download.gif";
import RegCourseCard from "./RegCourseCard";

const cookies = new Cookies();
const INPROGRESS_URL = "/individualtrainee/inprogress";
const Inprogress = () => {
  const [isloading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  let result = [];
  const getCourses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(INPROGRESS_URL);
      result = res.data.registered_courses
      setCourses(result);
      setIsLoading(false);
    } catch (e) {
       console.log(e);
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
        <section className={InprogressStyles["Wrapper"]}>
           <section className={InprogressStyles["main-section"]}>
              <h1>My Learning</h1>          
           </section>
           <section className={InprogressStyles['courses']}>
           <button  className={InprogressStyles['main-btn']} style={{marginBottom:'1rem'}} onClick={()=>window.location.href="/courses"}>Learn more</button>
          <div className={RegCourseCardStyles["cardgrid"]}>
            {courses.map((el, index) => {
              return <RegCourseCard  data={el.courseId} progress={ Math.floor((el.progress/el.courseId.numberOfItems)*100)} courseRating = {el.courseRating?el.courseRating.userRating:0} courseReview={el.courseRating?el.courseRating.userReview:""}index={index} key={index} />;
            })}
          </div> 
          </section>
        </section>
        </div>
      )}
    </div>
  );
};

export default Inprogress;
