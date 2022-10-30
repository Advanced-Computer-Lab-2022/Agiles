import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import { AiFillStar } from "react-icons/ai";
const Course = () => {
  const [course, setCourse] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const courseId = location.state.id;
  const style = { color: "goldenrod" };

  let x = Array.from(Array(course.rating).keys()).map((el) => {
    return <AiFillStar style={style}></AiFillStar>;
  });
  const stars = <span className={CourseStyles["star"]}> {x}</span>;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/course/${courseId}`);
      let jsondata = await res.json();
      if (res.ok) {
        setCourse(jsondata);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={CourseStyles["course"]}>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <>
          
          
              <div className={CourseStyles["mainTop"]}>{course.title}</div>
            
            <div className={CourseStyles["item"]}> subject: {course.subject}</div>
            <div className={CourseStyles["item"]}>Description : {course.description}</div>
            <div className={CourseStyles["item"]}>Instructor : {course.instructor}</div>
            <div className={CourseStyles["item"]}>Rating : {course.rating === 0 ? "unrated" : stars}</div>
            {course.price == 0 ? (
              <div className={CourseStyles["item"]}>Price : Free</div>
            ) : (
              <>
                {!window.sessionStorage.getItem("factor") ? (
                  <div className={CourseStyles["item"]}>Price: {course.price} USD</div>
                ) : (
                  <div className={CourseStyles["item"]}>
                    Price:{" "}
                    {course.price * window.sessionStorage.getItem("factor")}{" "}
                    {window.sessionStorage.getItem("currency").toUpperCase()}
                  </div>
                )}
              </>
            )}
         
          
            
              <div className={CourseStyles["item"]}>subtitles:</div>{" "}
              {course.subtitles != null
                ? course.subtitles.map((el) => {
                    return (
                      <div>
                        <span className={CourseStyles["item"]}>subtitle: {el.subtitle}</span>
                        {"   "}
                        <span className={CourseStyles["item"]}>time in hrs: {el.time}</span>
                      </div>
                    );
                  })
                : ""}
            
            <div className={CourseStyles["item"]}>totalHoursOfCourse: {course.totalHoursOfCourse}</div>
            <div className={CourseStyles["item"]}>language: {course.language}</div>
            <div className={CourseStyles["item"]}>
              {course.discount === 0
                ? "no discount"
                : `discount: ${course.discount}`}
            </div>
            <div className={CourseStyles["item"]}>
              {course.exercises != null
                ? `${course.exercises.length} exercises`
                : ""}
            </div>
          
        </>
      )}
    </div>
  );
};

export default Course;
