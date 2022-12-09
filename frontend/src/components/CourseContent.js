import style from "./CourseContent.module.css";
import regStyles from "../pages/Course/RegCourse.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
import RegCourse from "../pages/Course/RegCourse";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const cookies = new Cookies();
const CoursContent = () => {
  const location = useLocation();
  const progress = location.state.progress;
  const course_id = new URLSearchParams(location.search).get("courseId");
  const index = new URLSearchParams(location.search).get("idx");
  const [course, setCourse] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState([]);
  const [questions, setQuestions] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(
      {
        pathname: "/subtitleView",
        search: e.target.id,
      },
      {
        state: {
          currentState: e.target.name,
          data: subtitles,
          courseId: course_id,
        },
      }
    );
  };
  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data.firstField);
      setSubtitles(res.data.firstField.subtitles);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleClose = () => setShow(false);

  const handleFinalExamClick = async (e) => {
    try {
      const exam = await axios.get(
        `/individualtrainee/getFinalExamGrade?studentId=${cookies.get(
          "currentUser"
        )}&courseId=${course_id}`
      );

      if (exam.data == null) {
        navigate(
          {
            pathname: "/courseExam",
            search:
              "&studentId=" +
              cookies.get("currentUser") +
              "&courseId=" +
              course_id,
          },
          { state: { final: "true" } }
        );
      } else {
        setShow(true);
        setGrade(exam.data.result);
        setQuestions(exam.data.studentChoices.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleExamClick = async (e) => {
    try {
      const exam = await axios.get(
        `/individualtrainee/getIndividualExerciseGrade?id=${cookies.get(
          "currentUser"
        )}&subtitleId=${e.target.id}`
      );

      if (exam.data == null) {
        navigate(
          {
            pathname: "/courseExam",
            search:
              "?subtitleId=" +
              e.target.id +
              "&studentId=" +
              cookies.get("currentUser") +
              "&courseId=" +
              course_id,
          },
          { state: { final: "false" } }
        );
      } else {
        setShow(true);
        setGrade(exam.data.result);
        setQuestions(exam.data.studentChoices.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            idx={index}
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
                        <ListGroup.Item key={"exam"}>
                          <button
                            id={subtitle._id}
                            name={"exam"}
                            onClick={handleExamClick}
                            className={style["subtitleView"]}
                          >
                            Exam
                          </button>
                          <Modal
                            backdrop={false}
                            show={show}
                            onHide={handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Grade</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className={style["rating-box"]}>
                                {grade == null ? (
                                  <h3>Not Graded Yet</h3>
                                ) : (
                                  <h3>Grade: {grade}</h3>
                                )}
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              <div>
                <Accordion.Item key={"finalExam"} className="d-grid gap-2">
                  <Button
                    id={course_id}
                    name={"finalexam"}
                    onClick={handleFinalExamClick}
                    size="lg"
                    variant="light"
                  >
                    Final Exam
                  </Button>
                  <Modal backdrop={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Grade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className={style["rating-box"]}>
                        {grade == null ? (
                          <h3>Not Graded Yet</h3>
                        ) : (
                          <h3>
                            Grade: {grade} / {questions}
                          </h3>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursContent;
