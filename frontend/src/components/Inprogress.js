import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect,useState } from "react";
import { CourseCard } from "./CourseCard";
import CourseStyles from "../pages/Course/Courses.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
const cookies = new Cookies();
const INPROGRESS_URL = "/individualtrainee/inprogress";
const Inprogress = () => {
  const currentUser = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(false);
  let courses = [];
  let progress = [];
  const getCourses = async () => {
    setIsLoading(true);
    try{
    const res = await axios.get(INPROGRESS_URL + "/" + currentUser);
    courses = res.data.registered_courses.id;
    progress = res.data.registered_courses.progress;
    }
    catch(err){
        console.log(err);
    }
        
    
    setIsLoading(false);
  };
  useEffect(() => {
    getCourses();
  }, [currentUser]);
  return (
    <div className={CourseStyles["course"]}>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <>
          <div className={CourseStyles["course-list"]}>
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
