import regStyles from "../Course/RegCourse.module.css"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CoursePreInst from "./CoursePreInst";
import CourseConInst from "./CourseConInst";
import axios from "axios";
import SetExam from "./SetExam";
import CoursePromo from "./CoursePromo";
const MyCourseInst = () => {
  const location = useLocation();
  const course_id = location.state.course_id;

  const [course, setCourse] = useState([]);
  const [choice, setChoice] = useState(0);
  const handleClick = (e) => {
    setChoice(e.target.value);
  };

  const fetchdata = async () => {
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data);
    } catch (e) {
      console.log(e);
    }
    useEffect(()=>{
      fetchdata();
    },[])
    const project = () => {
      switch(choice) {

        case 0:   return<CoursePreInst course={course}/>;
        case 1:   return <CourseConInst course={course}/>
        case 2: return <></>;
        case 3:  return <SetExam/>;

        default:return <h1>error</h1>
      }
    }
  };
  return (
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
            <li value ={0} className={choice==0?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Preview</li>
            <li value ={1} className={choice==1?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Content</li>
            <li value ={2} className={choice==2?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>define a promotion</li>
            <li value ={3} className={choice==3?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Set Final Exam</li>
          </ul>
        </div>
      </section>
      <section className={regStyles["rightsection"]}>{project()}</section>
    </div>
  );
};

export default MyCourseInst;
