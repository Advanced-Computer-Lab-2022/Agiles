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
          <div className={CourseStyles["mainTop"]}>
            <div className={CourseStyles["mainTitle"]}>
              <h1 className={CourseStyles["h1main"]}>{course.title}</h1>
            </div>
            <h3> subject: {course.subject}</h3>

            <h3>Description : {course.description}</h3>
            <h4>Instructor : {course.instructor}</h4>
            <h5>Rating : {course.rating === 0 ? "unrated" : stars}</h5>
            {course.price == 0 ? (
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
            <div>
              <div>subtitles:</div>{" "}
              {course.subtitles != null
                ? course.subtitles.map((el) => {
                    return (
                      <div>
                        <span>subtitle: {el.subtitle}</span>
                        {"   "}
                        <span>time in hrs: {el.time}</span>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div>totalHoursOfCourse: {course.totalHoursOfCourse}</div>
            <div>language: {course.language}</div>
            <div>
              {course.discount === 0
                ? "no discount"
                : `discount: ${course.discount}`}
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
