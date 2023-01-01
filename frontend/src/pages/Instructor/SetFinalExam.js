import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Link ,useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const SetFinalExam = () => {
  const navigate = useNavigate();
  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      margin :"20px auto",
      padding: "5px 15px 5px 15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      resize: "vertical",
    },
    button: {
      backgroundColor: "#a00407",
      color: "white",
      border: "none",
      borderRadius:'0',
      width:'180px',
      cursor: "pointer",
      float: "right",
    },
  };

  const [questions, setQuestions] = useState([
    {
      content: "",
      firstChoice: "",
      secondChoice: "",
      thirdChoice: "",
      fourthChoice: "",
      answer: "",
    },
  ]);

  const handleSubmit = async (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseId = urlParams.get("courseId");
    const exam = {
      courseId: courseId,
      questions: questions,
    };

    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };

    try {
      const res = await axios.post("/instructor/setFinalExam", exam, config);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Final Exam has been added successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {navigate(-1)});
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Fill all Fields",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  let addFormFields = () => {
    setQuestions([
      ...questions,
      {
        content: "",
        firstChoice: "",
        secondChoice: "",
        thirdChoice: "",
        fourthChoice: "",
        answer: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...questions];
    newFormValues.splice(i, 1);
    setQuestions(newFormValues);
  };
  let handleChange = (i, e) => {
    let newFormValues = [...questions];
    newFormValues[i][e.target.name] = e.target.value;
    setQuestions(newFormValues);
  };

  return (
      <Form onSubmit={handleSubmit} style={styles.form}>
        <h4
          style={{
            color: "#a00407",
            display: "flex",
            fontWeight:'bold',
            justifyContent: "center",
          }}
        >
         Final Exam
        </h4>
        {questions.map((element, index) => (
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>Question {index + 1}</Form.Label>
              <Form.Control
                required
                type="text"
                name="content"
                placeholder="write your question here ..."
                value={element.content || ""}
                style={styles.input}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>First choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstChoice"
                placeholder="write first choice here ..."
                style={styles.input}
                value={element.firstChoice || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>Second Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="secondChoice"
                placeholder="write second choice here ..."
                value={element.secondChoice || ""}
                style={styles.input}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>Third Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="thirdChoice"
                placeholder="write third choice here ..."
                value={element.thirdChoice || ""}
                style={styles.input}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>Fourth Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="fourthChoice"
                placeholder="write fourth choice here ..."
                value={element.fourthChoice || ""}
                style={styles.input}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={styles.label}>
                Answer of the question
              </Form.Label>

              <Form.Control
                required
                type="number"
                name="answer"
                placeholder="write the number of the correct answer ex(1,2,3,4 )"
                max="4"
                min="1"
                value={element.answer || ""}
                style={styles.input}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {index ? (
                <Button
                  variant="danger"
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(index)}
                >
                  Remove Question
                </Button>
              ) : null}
            </Form.Group>
          </div>
        ))}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <span className="button-section">
            <Button
              variant="dark"
              className="button add"
              type="button"
              style={{  border: "1px solid black",borderRadius:'0' }}
              onClick={() => addFormFields()}
            >
              Add Question
            </Button>
          </span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Button  type="submit" style={styles.button}>
            create Exam{" "}
          </Button>
        </Form.Group>
      </Form>
  );
};
export default SetFinalExam;
