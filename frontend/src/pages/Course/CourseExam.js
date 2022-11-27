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

const CourseExam = (props) => {
  const location = useLocation();
  // const query = new URLSearchParams(location.search);
  const query = "63810085e606ba473f59e1ba";
  const [CourseExam, setCourseExam] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  let corporate = false;
  if (props.corporate) {
    corporate = true;
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/individualtrainee/courseExam?subtitleId=${query}`
      );
      let jsondata = await res.json();
      if (res.ok) {
        setCourseExam(jsondata["questions"]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Exam</h1>
      <div class="d-grid gap-3">
        <Form>
          {CourseExam.map((exam, index) => {
            return (
              <div class="p-2 bg-light border">
                <Card border="primary" style={{ width: "135rem" }}>
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
                          />
                          <Form.Label>- {exam["firstChoice"]} </Form.Label>
                        </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Radio
                            value="1"
                            name={`Choices${index}`}
                          />
                          <Form.Label>- {exam["secondChoice"]} </Form.Label>
                        </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Radio
                            value="1"
                            name={`Choices${index}`}
                          />
                          <Form.Label>- {exam["thirdChoice"]} </Form.Label>
                        </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Radio
                            value="1"
                            name={`Choices${index}`}
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
export default CourseExam;
