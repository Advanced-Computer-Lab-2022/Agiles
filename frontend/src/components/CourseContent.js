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
import {AiOutlineCheck} from "react-icons/ai";
import Badge from 'react-bootstrap/Badge';
const cookies = new Cookies();
const CoursContent = () => {
  const location = useLocation();
  const progress = location.state.progress;
  const course_id = new URLSearchParams(location.search).get("courseId");
  const index = new URLSearchParams(location.search).get("idx");
  const [course, setCourse] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleId, setSubtitleId] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState([]);
  const [finalgrade, setFinalGrade] = useState(-1);
  const [finalquestions, setFinalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState([]);
  const navigate = useNavigate();

  const getFinishedExams = async (e) => {
    if(cookies.get("status") !== 1){
      try{
        let res = await axios.post("/individualtrainee/getTraineeExams",
      {   
        courseId: course_id,
      }) 
      let finalexam = await axios.get(
        `/individualtrainee/getFinalExamGrade?studentId=${cookies.get(
          "currentUser"
        )}&courseId=${course_id}`
      );

        setGrade(res.data);
        setFinalGrade(finalexam.data.result);
        setFinalQuestions(finalexam.data.studentChoices.length);
        console.log(res);
        console.log(course_id)
      }catch (e) {
        console.log(e);
      }
    } 
  }

  const getFinishedItems = async (e) => {
    console.log("yes")
    if(cookies.get("status") !== 1){
      try{
      let res = await axios.get("/individualtrainee/getTraineeProgress",
      {   
        courseId: course_id,
      })
      setDone(res.data.progress);
    }catch(e){
      console.log(e);
      
    }
  }
  }



  const handleClick = async (e) => {
    e.preventDefault();
    
    if(cookies.get("status") !== 1){
      try{
      const res = await axios.post("/individualtrainee/updateLinkProgress", {
  
        linkId: e.target.id.substring(7,31),
        courseId: course_id,
        completedItems: 1,
        subtitleId: e.target.value,
      
  
        
      }) //status 1 means instructor 2c,0 means trainee 3 means admin
    if(res){
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
    }
      }catch(e){
        console.log(e)
      }
    } else{
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
    }
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
    getFinishedItems();
    fetchdata();
    getFinishedExams();
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
              flush
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
                          <ListGroup.Item key={index1} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"> 
                            <button
                              id={
                                "linkId=" +
                                link._id +
                                "&" +
                                "subtitleId=" +
                                subtitle._id
                              }
                              name={index0 + " " + index1}
                              value = {subtitle._id}
                              onClick={handleClick}
                              className={style["subtitleView"]}
                            >
                              {link.linkDesc}
                            </button>
                            {done.find((item) => item.linkId === link._id)? (
                              <AiOutlineCheck className={style["check"]} />) : (null)
                                }
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item key={"exam"} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                          {grade.find((item) => item.subtitleId === subtitle._id)? (
                            <><button
                              id={subtitle._id}
                              name={"exam"}
                              onClick={handleExamClick}
                              className={style["subtitleView"]}
                              disabled
                            >
                              Quiz
                            </button>
                            <h5>
                            <Badge bg="primary" className={style["gradeBadge"]} pill>
                                {grade.find((item) => item.subtitleId === subtitle._id).result + "/" + grade.find((item) => item.subtitleId === subtitle._id).studentChoices.length}
                              </Badge>
                              </h5></>
                          ):(
                            <button
                                id={subtitle._id}
                                name={"exam"}
                                onClick={handleExamClick}
                                className={style["subtitleView"]}
                              >
                                Quiz
                              </button>
                                  )}
                                  

                                  
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              <div>
                <Accordion.Item key={"finalExam"} className="d-grid gap-2">
                {finalgrade !== -1? (
                            <><h5 className="d-flex justify-content-center mt-2 ">
                              Final Exam Grade
                            </h5>
                            <h3  className="d-flex justify-content-center">
                                {finalgrade + "/" +  finalquestions}
                              </h3>
                              </>
                          ):(
                            <Button
                    id={course_id}
                    name={"finalexam"}
                    onClick={handleFinalExamClick}
                    size="lg"
                    style={{
                      backgroundColor: "#a00407",
                      borderRadius: 0,
                      border: "none",
                    }}  
                  >
                    Final Exam
                  </Button>
                                  )}
                  
                  
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
