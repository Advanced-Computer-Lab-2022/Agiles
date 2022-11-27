import regStyles from "../Course/RegCourse.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import CoursePreInst from "./CoursePreInst";
import CourseConInst from "./CourseConInst";
import axios from "axios";
import SetExam from "./SetExam";
import CoursePromo from "./CoursePromo";
const MyCourseInst = () => {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get('courseId');;
  const name = new URLSearchParams(location.search).get('view');
  const [course, setCourse] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(
      {
        pathname: "/myCourseInst",
        search: `?view=${e.target.id}&courseId=${course_id}`,
      },);
  };
  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(()=>{
    fetchdata();
  },[name]);
    const project = () => {
      switch(name) {

        case 'preview':   return<CoursePreInst course={course}/>;
        case 'content':   return <CourseConInst course={course}/>
        case 'promo': return  <CoursePromo course_id = {course_id}/>;
        case 'setexam':  return <SetExam/>;
        default:return <h1>error</h1>
      }
    }
  return (
    <>{isloading ? (
      <LoadingScreen loading={true} logoSrc={spinner} />
    ) : (
    <div className={regStyles["mainreg"]}>
      <section className={regStyles["leftsection"]}>
        <div className={regStyles["leftsection-top"]}>
          <img
            src={course.imgUrl}
            alt="courseimage"
            className={regStyles["leftsection-img"]}
          />
          <label className={regStyles["leftsection-title"]}>
            {course.title}
          </label>
          <label className={regStyles["leftsection-subtitle"]}>
            {course.instructorname}
          </label>
        </div>
        <div className={regStyles["leftsection-bottom"]}>
          <ul>
            <li id ='preview' className={name=='preview'?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Preview</li>
            <li id ='content' className={name=='content'?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Content</li>
            <li id ='promo' className={name=='promo'?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>define a promotion</li>
            <li id ='setexam' className={name=='setexam'?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Set Final Exam</li>
          </ul>
        </div>
      </section>
      <section className={regStyles["rightsection"]}>{project()}</section>
    </div>)}</>
  );
};

export default MyCourseInst;
