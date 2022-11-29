import Cookies from "universal-cookie";
import axios from "axios";
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
  const currentUser = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const token = cookies.get("jwt");
  let result = [];
  const getCourses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(INPROGRESS_URL + "/" + currentUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      result = res.data.registered_courses
      setCourses(result);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className={CourseStyles["course"]}>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={InprogressStyles["Wrapper"]}>
          <h2 className={InprogressStyles["Wrapper_h2"]}>My Learning</h2>
          <div className={RegCourseCardStyles["cardgrid"]}>
            {courses.map((el, index) => {
              return <RegCourseCard  data={el.courseId} progress={el.progress} instRating={el.instRating} key={index} />;
            })}
          </div> 
        </section>
      )}
    </div>
  );
};

export default Inprogress;
