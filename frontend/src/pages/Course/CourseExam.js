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
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CourseExam = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subtitleId = query.get("subtitleId");
  const studentId = query.get("studentId");
  const courseId = query.get("courseId");
  const [CourseExam, setCourseExam] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [examState, setExam] = useState(false);
  const [answers, setAnswers] = useState(["1"]);
  const [result, setResult] = useState([]);
  const [grade, setGrade] = useState(0);
  const final = location.state.final;

  let corporate = false;
  const navigate = useNavigate();
  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      margin: '15px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    radio: {
      marginRight: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    button: {
      backgroundColor: '#a00407',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      float: 'right',
      width:'20%',
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let res = {};

      if (!corporate) {
        if (final == "false") {
          res = await fetch(
            `/individualtrainee/courseExam?subtitleId=${subtitleId}`
          );
        } else {
          res = await fetch(
            `/individualtrainee/courseFinalExam?courseId=${courseId}`
          );
        }
      } else {
        res = await fetch(`/corporate/courseExam?subtitleId=${subtitleId}`);
      }
      let jsondata = await res.json();
      if (res.ok) {
        setCourseExam(jsondata["questions"]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = {};
    if (!corporate) {
      res = await axios.post(
        `/individualtrainee/submitExam?subtitleId=${subtitleId}&studentId=${studentId}&courseId=${courseId}`,
        {
          answers: answers,
          final: final,
        }
      );
      setGrade(res.data.resultno);
    } else {
      res = await axios.post(
        `/corporate/submitExam?subtitleId=${subtitleId}&studentId=${studentId}&courseId=${courseId}`,
        {
          answers: answers,
          final: final,
        }
      );
    }
    let jsondata = await res.data;
    setResult(jsondata["result"]);

    setExam(true);
  };

  const handleRadioChange = (event) => {
    const indexname = event.target.name;
    //get last char from name
    let index = indexname.charAt(indexname.length - 1);
    if (answers[index] !== null && event.target.checked) {
      answers[index] = event.target.value;
    } else if (event.target.checked) {
      setAnswers((oldArray) => [...oldArray, event.target.value]);
    }
  };

  return (
    <div>
      <h1 style={{textAlign: "center",color: "#A00407"}}>Quiz</h1>
      <div class="d-grid gap-3">

        <Form>
          {CourseExam.map((exam, index) => {
            return (
              <div>
                <Card border="primary" style={{ width: "50%" ,marginLeft:"25%" ,marginBottom: "2%"}}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <Form.Label style={{color: "#A00407"}}>Question {index + 1} </Form.Label>
                    </Card.Title>
                    <Card.Text>
                      <Form.Label><b>{exam["content"]}</b></Form.Label>
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        {examState ? (
                          result[index] === "1" || result[index] === "-1" ? (
                            <>
                              <Form.Label className={style["correct"]}>
                                - {exam["firstChoice"]}
                              </Form.Label>
                            </>
                          ) : answers[index] === "1" ? (
                            <>
                              <Form.Label className={style["wrong"]}>
                                - {exam["firstChoice"]}
                              </Form.Label>
                            </>
                          ) : (
                            <>
                              <Form.Label>- {exam["firstChoice"]}</Form.Label>
                            </>
                          )
                          ) : (
                          <InputGroup>
                            <Form.Check
                              value={1}
                              type="radio"
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              required
                              defaultChecked
                              
                            />
                            <Form.Label><div style={{marginLeft : "10px"}}> {exam["firstChoice"]}</div> </Form.Label>
                          </InputGroup>
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {examState ? (
                          result[index] === "2" || result[index] === "-2" ? (
                            <>
                              <Form.Label className={style["correct"]}>
                                - {exam["secondChoice"]}
                              </Form.Label>
                            </>
                          ) : answers[index] === "2" ? (
                            <>
                              <Form.Label className={style["wrong"]}>
                                - {exam["secondChoice"]}
                              </Form.Label>
                            </>
                          ) : (
                            <>
                              <Form.Label>- {exam["secondChoice"]}</Form.Label>
                            </>
                          )
                        ) : (
                          <InputGroup>
                            <Form.Check
                              value={2}
                              type="radio"
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              required
                            />
                            <Form.Label><div style={{marginLeft : "10px"}}> {exam["secondChoice"]} </div></Form.Label>
                          </InputGroup>
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {examState ? (
                          result[index] === "3" || result[index] === "-3" ? (
                            <>
                              <Form.Label className={style["correct"]}>
                                - {exam["thirdChoice"]}
                              </Form.Label>
                            </>
                          ) : answers[index] === "3" ? (
                            <>
                              <Form.Label className={style["wrong"]}>
                                - {exam["thirdChoice"]}
                              </Form.Label>
                            </>
                          ) : (
                            <>
                              <Form.Label>- {exam["thirdChoice"]}</Form.Label>
                            </>
                          )
                        ) : (
                          <InputGroup>
                            <Form.Check
                              value={3}
                              type="radio"
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              required
                            />
                            <Form.Label><div style={{marginLeft : "10px"}}> {exam["thirdChoice"]} </div></Form.Label>
                          </InputGroup>
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {examState ? (
                          result[index] === "4" || result[index] === "-4" ? (
                            <>
                              <Form.Label className={style["correct"]}>
                                - {exam["fourthChoice"]}
                              </Form.Label>
                            </>
                          ) : answers[index] === "4" ? (
                            <>
                              <Form.Label className={style["wrong"]}>
                                - {exam["fourthChoice"]}
                              </Form.Label>
                            </>
                          ) : (
                            <>
                              <Form.Label>- {exam["fourthChoice"]}</Form.Label>
                            </>
                          )
                          ) : (
                          <InputGroup>
                            <Form.Check
                              value={4}
                              type="radio"
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              required
                            />
                            <Form.Label><div style={{marginLeft : "10px"}}> {exam["fourthChoice"]} </div></Form.Label>
                          </InputGroup>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          <div class="col-md-12 text-center">
            {!examState ? (
              <Button variant="primary" onClick={handleSubmit} size="lg">
                Submit
              </Button>
            ) : (
              <>
                <h1>
                  Grade: {grade} / {answers.length}
                </h1>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
export default CourseExam;
