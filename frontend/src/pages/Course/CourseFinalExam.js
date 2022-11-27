import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import style from "./CourseExam.module.css";

const CourseFinalExam = (props) => {
  const location = useLocation();
  // const query = new URLSearchParams(location.search);
  const query = props.courseId;
  const [CourseFinalExam, setCourseFinalExam] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [exam, setExam] = useState(false);
  const [answers, setAnswers] = useState([]);

  let corporate = false;
  if (props.corporate) {
    corporate = true;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let res = {};
      if (!corporate) {
        res = await fetch(
          `/individualtrainee/courseFinalExam?courseId=${query}`
        );
      } else {
        res = await fetch(`/corporate/courseFinalExam?courseId=${query}`);
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
    <div>
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
  );
};
export default CourseFinalExam;
