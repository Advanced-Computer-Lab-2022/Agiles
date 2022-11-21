import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import { AiFillStar } from "react-icons/ai";
const Course = () => {
  const [course, setCourse] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [promotion, setPromotion] = useState(0);
  const [enddate, setEnddate] = useState("");
  const location = useLocation();
  const courseId = location.state.id;
  const style = { color: "goldenrod" };
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/course/addPromotion?id=6361b2deef7816eb1d9eb915`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ promo: promotion, enddate: enddate }),
      });
    } catch (e) {
      console.log(e);
    }
  };
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
          <div className={CourseStyles["bigDiv"]}>
            <div className={CourseStyles["item"]}>
              {" "}
              <span className={CourseStyles["head"]}>Subject:</span>
              <span className={CourseStyles["span"]}>{course.subject}</span>
            </div>
            <div className={CourseStyles["item"]}>
              {" "}
              <span className={CourseStyles["head"]}> CoursePreview: </span>
              <span className={CourseStyles["span"]}>
                {" "}
                <a href={course.coursePreview}></a>
              </span>
            </div>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}> Description:</span>{" "}
              <span className={CourseStyles["span"]}>{course.description}</span>
            </div>
          </div>
          <div className={CourseStyles["bigDiv"]}>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>Instructor: </span>
              <span className={CourseStyles["span"]}>{course.instructor}</span>
            </div>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>Rating:</span>{" "}
              <span className={CourseStyles["span"]}>
                {course.rating === 0 ? "unrated" : stars}
              </span>
            </div>
            {course.price == 0 ? (
              <div className={CourseStyles["item"]}>
                {" "}
                <span className={CourseStyles["head"]}>Price:</span>
                <span className={CourseStyles["span"]}> Free</span>
              </div>
            ) : (
              <>
                {!window.sessionStorage.getItem("factor") ? (
                  <div className={CourseStyles["item"]}>
                    <span className={CourseStyles["head"]}> Price:</span>{" "}
                    <span className={CourseStyles["span"]}>
                      {course.price} USD
                    </span>
                  </div>
                ) : (
                  <div className={CourseStyles["item"]}>
                    <span className={CourseStyles["head"]}> Price:</span>{" "}
                    <span className={CourseStyles["span"]}>
                      {course.price * window.sessionStorage.getItem("factor")}{" "}
                      {window.sessionStorage.getItem("currency").toUpperCase()}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={CourseStyles["bigDiv"]}>
            <div className={CourseStyles["item"]}>
              {" "}
              <span className={CourseStyles["head"]}>Subtitles:</span>
            </div>{" "}
            {course.subtitles != null
              ? course.subtitles.map((el) => {
                  return (
                    <div>
                      <span className={CourseStyles["item"]}>
                        <span className={CourseStyles["subtitleItem"]}>
                          Subtitle:
                        </span>
                        <span className={CourseStyles["span"]}>
                          {" "}
                          {el.subtitle}
                        </span>
                      </span>
                      {"   "}
                      <span className={CourseStyles["item"]}>
                        <span className={CourseStyles["subtitleItem"]}>
                          Time in Hrs:
                        </span>{" "}
                        <span className={CourseStyles["span"]}>{el.time}</span>{" "}
                      </span>
                      <a className={CourseStyles["item"]} href={el.link}>
                        {" "}
                        SubtitleLink
                      </a>
                      <br></br>

                      <span className={CourseStyles["item"]}>
                        <span className={CourseStyles["subtitleItem"]}>
                          Short Summary:
                        </span>{" "}
                        <span className={CourseStyles["span"]}>
                          {el.linkDesc}
                        </span>{" "}
                      </span>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className={CourseStyles["bigDiv"]}>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>totalHoursOfCourse:</span>{" "}
              <span className={CourseStyles["span"]}>
                {course.totalHoursOfCourse}
              </span>
            </div>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>language: </span>{" "}
              <span className={CourseStyles["span"]}> {course.language} </span>
            </div>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>
                {course.discount == 0
                  ? "No Discount"
                  : `Discount: ${course.discount}`}
              </span>
            </div>
            <div className={CourseStyles["item"]}>
              <span className={CourseStyles["head"]}>Exercises </span>
              <span className={CourseStyles["span"]}>
                {" "}
                {course.exercises != null
                  ? course.exercises.map((el, index) => {
                      return (
                        <div>
                          <span className={CourseStyles["span"]} id={index}>
                            {index}: {el}
                          </span>
                        </div>
                      );
                    })
                  : ""}
              </span>
            </div>
          </div>
        </>
      )}
      <div className={CourseStyles["bigDiv"]}>
        <form onSubmit={handleSubmit}>
          <div>Add a Promotion</div>
          <div>
            <span>Amount (%) </span>
            <input
              required
              type="number"
              value={promotion}
              onChange={handlePromo}
            ></input>
          </div>
          <div>
            <span>End Date </span>

            <input
              required
              type="date"
              value={enddate}
              onChange={handleEnddate}
            ></input>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Course;
