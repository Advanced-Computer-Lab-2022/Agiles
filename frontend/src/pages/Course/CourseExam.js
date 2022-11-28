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
  const subtitleId = new URLSearchParams(location.search).get("subtitleId");
  const studentId = new URLSearchParams(location.search).get("studentId");
  const courseId =  new URLSearchParams(location.search).get("courseId");
  const [CourseExam, setCourseExam] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [examState, setExam] = useState(false);
  const [answers,setAnswers]= useState([]);
  const [result,setResult]= useState([]);
  const [grade,setGrade] = useState(0);
  
  let corporate = false;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let res = {};
      if (!corporate) {
        res = await fetch(`/individualtrainee/courseExam?subtitleId=${subtitleId}`);
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
    console.log("submitted");
    let res = {};
    if(!corporate){
      res = await axios.post(`/individualtrainee/submitExam?subtitleId=${subtitleId}&studentId=${studentId}&courseId=${courseId}`, {
      answers: answers,
    });
    const exam = await axios.get(`/individualtrainee/getIndividualExerciseGrade?id=${studentId}&subtitleId=${subtitleId}`);
    setGrade(exam.data.result);

    }
    else{
        res = await axios.post(`/corporate/submitExam?subtitleId=${subtitleId}&studentId=${studentId}&courseId=${courseId}`, {
        answers: answers,
      });
    }
    let jsondata = await res.data;
    setResult(jsondata["result"]);
    
    setExam(true);
  };


  const handleRadioChange = (event) => {
    const indexname = event.target.name;
    console.log("lol")
    //get last char from name
    let index = indexname.charAt(indexname.length - 1);
    if(answers[index] !== null && event.target.checked){
      answers[index] = event.target.value;
    }
    else if(event.target.checked){
      setAnswers(oldArray => [...oldArray, event.target.value]);
    }
    console.log(answers);
    
  }

  const handleBack = () => {
    //navigate to course page
    navigate(`/preReg?courseId=${courseId}`);
  }

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
                        {examState? (result[index] === "1" || result[index] === "-1"? (<>
                        <Form.Label className={style["correct"]}>- {exam["firstChoice"]}</Form.Label>
                        </>):(answers[index] === "1"?(
                            <>
                            <Form.Label className={style["wrong"]}>- {exam["firstChoice"]}</Form.Label></>):
                            (
                            <>
                            <Form.Label>- {exam["firstChoice"]}</Form.Label>
                            </>)
                            )):(
                            <InputGroup>
                            <InputGroup.Radio
                              value={1}
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              />
                            <Form.Label>- {exam["firstChoice"]} </Form.Label>
                          </InputGroup>)
                            }
                        
                      </ListGroup.Item>
                      <ListGroup.Item>
                      {examState? (result[index] === "2" || result[index] === "-2"? (<>
                        <Form.Label className={style["correct"]}>- {exam["secondChoice"]}</Form.Label>
                        </>):(answers[index] === "2"?(
                            <>
                            <Form.Label className={style["wrong"]}>- {exam["secondChoice"]}</Form.Label>
                            </>):
                            (
                            <>
                            <Form.Label>- {exam["secondChoice"]}</Form.Label>
                            </>)
                            )):(
                            <InputGroup>
                            <InputGroup.Radio
                              value={2}
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              />
                            <Form.Label>- {exam["secondChoice"]} </Form.Label>
                          </InputGroup>)
                            }
                      </ListGroup.Item>
                      <ListGroup.Item>
                      {examState? (result[index] === "3" || result[index] === "-3" ? (<>
                        <Form.Label className={style["correct"]}>- {exam["thirdChoice"]}</Form.Label>
                        </>):(answers[index] === "3"?(
                            <>
                            <Form.Label className={style["wrong"]}>- {exam["thirdChoice"]}</Form.Label></>):
                            (
                            <>
                            <Form.Label>- {exam["thirdChoice"]}</Form.Label>
                            </>)
                            )):(
                            <InputGroup>
                            <InputGroup.Radio
                              value={3}
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              />
                            <Form.Label>- {exam["thirdChoice"]} </Form.Label>
                          </InputGroup>)
                            }
                      </ListGroup.Item>
                      <ListGroup.Item>
                      {examState? (result[index] === "4" || result[index] === "-4"? (<>
                        <Form.Label className={style["correct"]}>- {exam["fourthChoice"]}</Form.Label>
                        </>):(answers[index] === "4"?(
                            <>
                            <Form.Label className={style["wrong"]}>- {exam["fourthChoice"]}</Form.Label></>):
                            (
                            <>
                            <Form.Label>- {exam["fourthChoice"]}</Form.Label>
                            </>)
                            )):(
                            <InputGroup>
                            <InputGroup.Radio
                              value={4}
                              name={`Choices${index}`}
                              onChange={handleRadioChange}
                              />
                            <Form.Label>- {exam["fourthChoice"]} </Form.Label>
                          </InputGroup>)
                            }
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          <div class="col-md-12 text-center">
            {!examState?(<Button variant="primary" onClick={handleSubmit} size="lg">
              Submit
            </Button>):(<>
              <h1>Grade: {grade} / {answers.length}</h1>
              <Button variant="primary" onClick={handleBack} size="lg">
              Back
            </Button>
            </>)}
            
          </div>
        </Form>
      </div>
    </div>
  );
};
export default CourseExam;
