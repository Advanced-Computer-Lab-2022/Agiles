import regStyles from "./RegCourse.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CoursePreview from "../../components/CoursePreview";
import CoursContent from "../../components/CourseContent";
const RegCourse = () => {
    const location = useLocation();
    const course = location.state.course;
    const progress=location.state.progress;
    const [choice , setChoice] = useState(0);
    const handleClick=(e)=>{
      setChoice(e.target.value);
    }
    const project = () => {
      switch(choice) {

        case 0:   return<CoursePreview course={course} progress={progress}/>;
        case 1:   return <CoursContent course={course}/>;
        case 2: return <></>;
        case 3:  return <></>;

        default:return <h1>error</h1>
      }
    }
  return (
    <div className={regStyles["mainreg"]}>
    <section className={regStyles["leftsection"]}>
      <div className={regStyles["leftsection-top"]}>
         <img src={course.imgUrl} alt="courseimage" className={regStyles["leftsection-img"]}/>
         <label className={regStyles["leftsection-title"]}>{course.title}</label>
         <label className={regStyles["leftsection-subtitle"]}>{course.instructorname}</label>
        </div>
        <div className={regStyles["leftsection-bottom"]}>
          <ul>
            <li value ={0} className={choice==0?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Preview</li>
            <li value ={1} className={choice==1?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Course Content</li>
            <li value ={2} className={choice==2?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Grades</li>
            <li value ={3} className={choice==3?regStyles["leftsection-liclicked"]:""} onClick={handleClick}>Exams</li>
          </ul>
          </div>
    </section>
    <section className={regStyles["rightsection"]}>
      {project()}
    </section>
    </div>
  );
};

export default RegCourse;
