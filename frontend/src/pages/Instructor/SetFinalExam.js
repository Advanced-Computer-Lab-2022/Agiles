import React from "react";
import { useState } from "react";
import axios from "axios";
import styled from "./SetExam.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const SetFinalExam = () => {
  // const [courseId, setCourseId] = useState("");
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
    } catch (e) {
      console.log(e);
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
    <div className={styled["course"]}>
      <Form onSubmit={handleSubmit}>
        <h1>Add Final Exam</h1>

        {questions.map((element, index) => (
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control
                required
                type="text"
                name="content"
                placeholder="write your question here ..."
                value={element.content || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstChoice"
                placeholder="write first choice here ..."
                value={element.firstChoice || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Second Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="secondChoice"
                placeholder="write second choice here ..."
                value={element.secondChoice || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Third Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="thirdChoice"
                placeholder="write third choice here ..."
                value={element.thirdChoice || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fourth Choice</Form.Label>
              <Form.Control
                required
                type="text"
                name="fourthChoice"
                placeholder="write fourth choice here ..."
                value={element.fourthChoice || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Answer of the question</Form.Label>

              <Form.Control
                required
                type="number"
                name="answer"
                placeholder="write the number of the correct answer ex(1,2,3,4 )"
                max="4"
                min="1"
                value={element.answer || ""}
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
              variant="primary"
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              Add Question
            </Button>
          </span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Button variant="primary" type="submit">
            create Exam{" "}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
export default SetFinalExam;
