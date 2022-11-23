import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import CourseStyles from "../pages/Course/Courses.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
import Filter from "./Filter";
const cookies = new Cookies();
const INPROGRESS_URL = "/individualtrainee/inprogress";
const Inprogress = () => {
  const currentUser = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const token = cookies.get("jwt");
  let result = [];
  let progress = [];
  const getCourses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(INPROGRESS_URL + "/" + currentUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      result = res.data.registered_courses.id;
      progress = res.data.registered_courses.progress;
      result = res.data.registered_courses;
      console.log(result);
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
        <>
          <Filter />
          <h1>My courses :</h1>
          <br></br>
          <div>
            {courses.map((el, index) => {
              return <CourseCard corporate={false} data={el} key={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Inprogress;
