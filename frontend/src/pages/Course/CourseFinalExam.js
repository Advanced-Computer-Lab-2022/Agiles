import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import MyCourseInst from "../Instructor/MyCourseInst";
import InputGroup from "react-bootstrap/InputGroup";
import style from "./CourseExam.module.css";
import regStyles from "./RegCourse.module.css";
const CourseFinalExam = () => {
  const location = useLocation();
  const courseId = new URLSearchParams(location.search);
  const [CourseFinalExam, setCourseFinalExam] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [exam, setExam] = useState(false);
  const [answers, setAnswers] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      const corporate = false;
      setIsLoading(true);
      let res = {};
      if (!corporate) {
        res = await axios.get(
          `/individualtrainee/courseFinalExam?courseId=${courseId}`
        );
      } else {
        res = await axios.get(`/corporate/courseFinalExam?courseId=${courseId}`);
      }
      let jsondata = await res.json();
      if (res.ok) {
        setCourseFinalExam(jsondata["questions"]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleRadioChange = (e) => {
    setAnswers((oldArray) => [...oldArray, e.target.value]);
    console.log(answers);
  };
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={regStyles["mainreg"]}>
          <MyCourseInst
            course_id={location.state.courseId}
            course_img={location.state.course_img}
            course_title={location.state.course_img}
            course_inst={location.state.course_inst}
            name={"exam"}
          />
          <h1>Final Exam</h1>
          <div class="d-grid gap-3">
            <Form>
              {CourseFinalExam.map((exam, index) => {
                return (
                  <div class="p-2 bg-light border">
                    <Card border="primary" style={{ width: "100rem" }}>
                      <Card.Body>
                        <Card.Title>
                          {" "}
                          <Form.Label>Question {index + 1} </Form.Label>
                        </Card.Title>
                        <Card.Text>
                          <Form.Label>{exam["content"]} </Form.Label>
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <InputGroup>
                              <InputGroup.Radio
                                value="1"
                                name={`Choices${index}`}
                                handleChange={handleRadioChange}
                              />
                              <Form.Label>- {exam["firstChoice"]} </Form.Label>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <InputGroup>
                              <InputGroup.Radio
                                value="1"
                                name={`Choices${index}`}
                                handleChange={handleRadioChange}
                              />
                              <Form.Label>- {exam["secondChoice"]} </Form.Label>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <InputGroup>
                              <InputGroup.Radio
                                value="1"
                                name={`Choices${index}`}
                                handleChange={handleRadioChange}
                              />
                              <Form.Label>- {exam["thirdChoice"]} </Form.Label>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <InputGroup>
                              <InputGroup.Radio
                                value="1"
                                name={`Choices${index}`}
                                handleChange={handleRadioChange}
                              />
                              <Form.Label>- {exam["fourthChoice"]} </Form.Label>
                            </InputGroup>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
              <div class="col-md-12 text-center">
                <Button variant="primary" size="lg">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
export default CourseFinalExam;
