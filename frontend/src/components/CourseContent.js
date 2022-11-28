import style from "./CourseContent.module.css";
import regStyles from "../pages/Course/RegCourse.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
import RegCourse from "../pages/Course/RegCourse";
import axios from "axios";
const cookies = new Cookies();
const CoursContent = () => {
  const location = useLocation();
  const progress =location.state.progress;
  const course_id = new URLSearchParams(location.search).get("courseId");
  const [course, setCourse] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(
      {
        pathname: "/subtitleView",
        search: e.target.id,
       },
      { state: { currentState: e.target.name, data: subtitles , courseId:course_id} }
    );
  };
  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data);
      setSubtitles(res.data.subtitles);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleExamClick = (e) => {
    navigate(
      {
        pathname: "/courseExam",
        search: "?subtitleId=" + e.target.id+ "&studentId="+cookies.get("currentUser")+ "&courseId=" +course_id ,
      })
    }
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={regStyles["mainreg"]}>
          <RegCourse
            course_id={course_id}
            course_img={course.imgUrl}
            progress={progress}
            course_title={course.title}
            course_inst={course.instructorname}
            name={"content"}
          />
          <div className={style["mainRight"]}>
            <label className={style["mainlabel"]}>Course Content</label>
            <Accordion
              defaultActiveKey="0"
              className={style["subtitles"]}
              alwaysOpen
            >
              {subtitles &&
                subtitles.map((subtitle, index0) => (
                  <Accordion.Item eventKey={index0} key={index0}>
                    <Accordion.Header>
                      <h5>
                        Section {index0 + 1}: {subtitle.subtitle}
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        {subtitle.link?.map((link, index1) => (
                          <ListGroup.Item key={index1}>
                            {index1 + 1}.{" "}
                            <button
                              id={"linkId=" + link._id}
                              name={index0 + " " + index1}
                              onClick={handleClick}
                              className={style["subtitleView"]}
                            >
                              {link.linkDesc}
                            </button>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item key ={"exam"}>
                    <button id = {subtitle._id} name = {"exam"} onClick={handleExamClick} className = {style['subtitleView']}>
                      Exam
                      </button>
                      
                      </ListGroup.Item>
                </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursContent;
