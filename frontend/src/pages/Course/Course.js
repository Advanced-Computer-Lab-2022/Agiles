import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
const Course = () => {
  const [course, setCourse] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const courseId = location.state.id;
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
          <div className={CourseStyles["mainTop"]}>
            <div className={CourseStyles["mainTitle"]}>
              <h1 className={CourseStyles["h1main"]}>{course.title}</h1>
            </div>
            <h3>description : {course.description}</h3>
            <h4>created By : {course.instructor}</h4>
            <h5>Rating : {course.rating === 0 ? "unrated" : course.rating}</h5>
            {course.price === 0 ? (
              <div>Price : Free</div>
            ) : (
              <>
                {!window.sessionStorage.getItem("factor") ? (
                  <div>Price: {course.price} USD</div>
                ) : (
                  <div>
                    Price:{" "}
                    {course.price * window.sessionStorage.getItem("factor")}{" "}
                    {window.sessionStorage.getItem("currency").toUpperCase()}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={CourseStyles["mainbottom"]}>
            <div>subtitles: {course.subtitles}</div>
            <div> subject: {course.subject}</div>
            <div>totalHoursOfCourse: {course.totalHoursOfCourse}</div>
            <div>totalHours OfSubtitles: {course.totalHoursOfSubtitles}</div>
            <div>language: {course.language}</div>
            <div>
              discount:{" "}
              {course.discount === 0 ? "no discount" : course.discount}
            </div>
            <div>
              {course.exercises != null
                ? `${course.exercises.length} exercises`
                : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
